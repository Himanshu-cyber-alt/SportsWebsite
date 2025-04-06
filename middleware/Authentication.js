import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from './config/db.js';
import bcrypt from 'bcrypt';

