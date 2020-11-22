import fs from 'fs';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import open from 'open';
import * as readline from 'readline';
import * as token from './token.json';
import * as tsam from './tsam.json';

class GoogleCalendarAPI {
	_SCOPES: Array<string> = [
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/calendar.events'
	];
	_TOKEN_PATH: string = 'token.json';
	_oAuth2Client: OAuth2Client;

	constructor() {
		const { client_id, client_secret, redirect_uri } = tsam.web;
		this._oAuth2Client = new OAuth2Client(
			client_id,
			client_secret,
			redirect_uri
		);
		this._oAuth2Client.setCredentials(token);
	}

	async listEvent() {
		const calendar = google.calendar({ version: 'v3' });
		const param = {
			auth: this._oAuth2Client,
			calendarId: 'primary',
			timeMin: new Date().toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: 'startTime'
		};
		try {
			const res = await calendar.events.list(param);
			const events = res.data.items;
			if (events) {
				console.log('Upcoming 10 events:');
				events.map((event, i) => {
					const start = event?.start?.dateTime || event?.start?.date;
					console.log(`${start} - ${event.summary}`);
				});
			} else {
				console.log('No upcoming events found.');
			}
		} catch (e) {
			console.log('The API returned an error:', e);
		}
	}

	async insertEvent() {
		const event = {
			summary: 'test event',
			description: 'test event',
			start: {
				dateTime: '2020-11-22T13:00:00',
				timeZone: 'America/Toronto'
			},
			end: {
				dateTime: '2020-11-22T14:00:00',
				timeZone: 'America/Toronto'
			},
			reminders: {
				useDefault: false,
				overrides: [{ method: 'popup', minutes: 10 }]
			}
		};

		const calendar = google.calendar({ version: 'v3' });

		const param = {
			auth: this._oAuth2Client,
			calendarId: 'primary',
			resource: event
		};

		try {
			const returned = await calendar.events.insert(param);
			console.log(returned);
		} catch (e) {
			console.log('error inserting', e);
		}
	}

	async getAccessToken() {
		const authUrl = this._oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: this._SCOPES
		});

		try {
			await open(authUrl);
		} catch (e) {
			console.log('error opening', e);
		}

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question('Enter the code from that page here: ', async (code) => {
			rl.close();
			try {
				const token = await this._oAuth2Client.getToken(code);
				console.log('Token', token);
				// Store the token to disk for later program executions
				fs.writeFile(this._TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) return console.error(err);
					console.log('Token stored to', this._TOKEN_PATH);
				});
			} catch (e) {
				console.error('Error retrieving access token', e);
			}
		});
	}
}

export { GoogleCalendarAPI };

