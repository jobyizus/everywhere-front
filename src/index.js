import logMessage from './js/logger'

//import
import * as React from "react";
import { defaultTheme, GlobalStyle } from "@styles";
import { App } from "./app";
import { LocaleProvider } from "./components/Locale";
import { ConfigInput } from "@saleor/sdk/lib/types";

import {
  apiUrl,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
} from "./constants";
import { history } from "./history";


////////////////
import './css/style.css'
// Log message to console
logMessage('Welcome to Expack!')