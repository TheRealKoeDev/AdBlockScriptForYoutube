# Remove Ads from YouTube

## Introduction

This repository contains a script that removed pesky Youtube Ads from YouTube.<br>
The method of adblocking is currently undetected by YouTube.<br>
It written to be used in combination with the [Tempermonkey](https://www.tampermonkey.net/) extension.<br>

## Installation

1. **Install Tampermonkey**
   - [Tampermonkey for Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
   - [Tampermonkey(Beta) for Opera](https://addons.opera.com/en-gb/extensions/details/tampermonkey-beta/)

2. **Open Tampermonkey Dashboard**<br/>
   Select the Tampermonkey extension in your browser and click on "Dashboard".

2. **Install the Script**<br/>
   [Click Here and Press Install](https://github.com/TheRealKoeDev/AdBlockScriptForYoutube/raw/main/script.user.js). If that does not work then:

   - Open the Editor by clicking on the "[+]" tab above the Tampermonkey Dashboard.
   - Copy and paste the contents of the script into the editor.
   - Click "File" => "Save"

3. **Enable the Script**<br/>
   Enable the script by clicking the switch next to the script name in the Tampermonkey Dashboard.

4. **Hard-Reload or close all open Youtube Tabs**<br/>
   The new extension and script will not run in tabs that were open during the installation.<br/>
   Go into your browsers address bar and press Enter for each open YouTube tab or just close them.

5. **[Optional] Disable other AdBlockers on YouTube**<br/>
   Other AdBlockers might still be detected by YouTube and trigger some unpleasant dialogs that this script does not cover.<br/>
   Most of these AdBlockers can be disabled for a specific site (in this case https://www.youtube.com/), follow the instructions of the respective AdBlocker to do that.

## Usage

The script should automatically block all YouTube-Ads once it is installed and enabled.

## Contribution

Feel free to create issues, pull requests or forks of this repository.<br/>
You can also copy or modify the code any way you like in accordance with the [MIT License](LICENSE).

## License

This project is licensed under the [MIT License](LICENSE).
