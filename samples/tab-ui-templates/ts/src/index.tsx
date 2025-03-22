/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as microsoftTeams from "@microsoft/teams-js";
import reportWebVitals from "./report-web-vitals";

// Initialize the Microsoft Teams SDK
// Note: The initialization method below works correctly in the M365 environment.
microsoftTeams.app.initialize();