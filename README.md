# JESS: Javascript Engineered System Software or JESS for short

JESS is an Open Source Discord Bot programmed in Discord.js with high functionality.

As developers, we saw a need for well-documented, non-server-specific code for Discord.js bots.

In inspiration by the HAL9000 from 2001: A Space Odyssey, we created JESS to set a high standard for the open source Discord.js community.

## Key Modules
```
- High Functioning Moderation commands for managing users, without granting direct admin/role access. Currently supported: Mute.

- High Functioning Chat Log system enabling bot owners to have a record of every messaged ever said on their server, neatly organized into greater directories identified by server-ids.
```

## Set Up

1. Assuming you download our repo, you will not need to `npm install` any packages.
The only packages currently on Jess are: discord.js , mkdir.

2. You will want to edit the `auth.json` file in the main JESS directory, as you will need to use your own token authentication to connect your bot.

To set up a token for bot authentication:

```
- Go to: https://discordapp.com/developers/applications/me

- Create a new application

- Create a Bot User

- Reveal the Token. Paste the Token into the auth.json file
```

You may also want to change the prefix in the auth.json file. The prefix is the text indicator which the bot will pick up to know if it is being issued a direct command, such as .jess Mute @MentionedUser.

3. Running the bot

- We suggest you use Microsoft Visual Studio Code as your text-editor for bot development, as the integrated console and general layout make for an ease of use experience. If you do not use MVSC, you should try to install an integrated console into your text-editor of choice.

```
To open the integrated powershell console: you can hot-key `control + tilde`
To run your bot: `node .`
To shut off your bot: `control c`
```

## Credits

- **BrianSQL**: Core Developer.
- **CensedPIE**: Core Developer.















By CensedPie & BrianSQL
