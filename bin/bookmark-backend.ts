#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BookmarkBackendStack } from '../lib/bookmark-backend-stack';

const app = new cdk.App();
new BookmarkBackendStack(app, 'BookmarkBackendStack');
