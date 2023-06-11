import mongoose from 'mongoose';
import { Logger } from '../utils/index';
require('dotenv').config();

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, (err) =>{
	if (err) {
		throw Logger.error(err);
	}
	Logger.info('Database Connection Succeeded');
});

// console.log('cone')