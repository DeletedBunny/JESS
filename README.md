# JESS: Javascript Engineered System Software

  JESS is an Open Source Discord Bot programmed in discord.js with high functionality.

  As developers, we saw a need for well-documented, non-server-specific code for discord.js bots.

  In inspiration of the HAL9000 from 2001: A Space Odyssey, we created JESS to set a high standard for the open source discord.js development community.

## Key Modules

- High Functioning Moderation commands for managing users, without granting direct admin/role access. Currently supported: Mute.

- High Functioning Chat Log system enabling Server-Owners to have a record of every sent message. Chat log files are neatly organized based on channel name, and grouped in directories identified by server IDs.


## Set Up

1. Download our repo, you will not need to `npm install` any packages.
Current packages on JESS are: discord.js , mkdir.

2. You will want to edit the `auth.json` file in the main JESS directory, as you will need to use your own token authenticator to connect your bot.

  To set up a token for bot authentication:

  ```
  - Go to: https://discordapp.com/developers/applications/me

  - Create a new application

  - Create a Bot User

  - Reveal the Token. Paste the Token into the auth.json file
  ```

3. (Optional) Change the prefix in the `auth.json` file. The prefix is the text indicator which the bot will pick up to know if it is being issued a direct command, such as .jess Mute @MentionedUser.

4. Running the bot

- We suggest you use Microsoft Visual Studio Code as your text-editor for bot development. The integrated console and general layout make for an ease of use experience. If you do not use MVSC, you should install an integrated console into your text-editor of choice.

  ```
  To open the integrated powershell console: `control + tilde`
  To run your bot: `node .`
  To shut off your bot: `control c`
  ```

## Credits

- **BrianSQL**: Core Developer.
- **CensedPIE**: Core Developer.
