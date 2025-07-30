#  🤖 ZapBot - Modifiable Template
This project is a WhatsApp bot built with the whatsapp-web.js library, designed to automate tasks, respond to commands, and send periodic messages to specific groups.

As of now, the bot has basic commands that can be changed to meet the necessary requirements.

---

## ✨ Features

* **Session Persistence:** Keeps the WhatsApp session active, avoiding the need to scan the QR Code on every restart.

* **!chat Command:** Returns the ID of the current chat (whether it's a group or a private conversation).

* **!chats Command (Admin):** Lists the IDs and names of all groups the bot is part of, accessible only by a configured administrator number.

* **!teste Command:** A simple response to verify if the bot is operational.

* **!imagem Command:** Sends a specific image (denilson.jpg) with a caption, replying to the original message.

* **Periodic Media Sending:** Sends an image (rijkaard.jpg) with a formatted message to pre-defined groups at regular intervals.

---

## 🛠️ Technologies Used

* **Node.js:** JavaScript runtime environment.

* **whatsapp-web.js**: Main library for interacting with WhatsApp Web.

* **qrcode-terminal:** Used to display the QR Code in the terminal during authentication.

* **whatsapp-web.js-tools:** For local session management (LocalAuth).

* **Nodemon:** A tool for automatically restarting the bot on code changes (ideal for development).

---

## ⚙️ How to Run the Project

Follow these steps to set up and run the project on your local machine:

### Prerequisites

* Node.js (version 18 or higher recommended)
* npm (Node.js package manager)

### Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Vieirismo/ZapBot
    cd folder-name # Replace with your project's folder name
    ```

2.  **Install Dependencies:**
    ```bash
    npm install puppeteer qrcode-terminal whatsapp-web.js whatsapp-web.js-tools
    
    ```

3. **Configure Variables in ```src/config.js:```**

    Open the ```src/config.js``` file and customize the following variables with your information. **These are crucial for the bot's operation.**

    * **MY_NUMBER:** Change this to your exact personal contact ID in the format ```XXXXXXXXXXX@c.us.``` This number will have access to administrator commands like ```!chats.```

    * **How to find your ID:**  Send ```!chat``` to the bot in a private conversation with it. The bot will reply with your chat ID, which will be in the correct ```XXXXXXXXXXX@c.us format.```

        ```bash
        //src/config.js
        const MY_NUMBER = '5519998566459@c.us'; // Example: Replace with your contact ID
        ```
    
    * **GROUP_TO_SEND:** Add the IDs of the groups to which the bot should send periodic messages.

    * **How to find a group's ID:** Send ```!chat``` inside the desired group. The bot will reply with the group's ID in the format ```XXXXXXXXXXX-YYYYYYYYYY@g.us.```

        ```bash
        const GROUPS_TO_SEND = [
        "920363375766274850@g.us", // Example ID
        ];
        ```

    * **PERIODIC_MESSAGE_INTERVAL_MS:** Define the interval in milliseconds for sending periodic messages.

        ```bash
        //src/config.js
        const PERIODIC_MESSAGE_INTERVAL_MS = 120000; // 2 minutes
        ```

    * **Prepare Images:**
    Ensure your images (```denilson.jpg``` and ```rijkaard.jpg```, or the names you've chosen) are located inside the img/ folder at the root of your project. The paths in your code (```src/commands/mediaCommands.js``` and ```src/cronJobs.js```) are configured to look there.

4. **Run the Bot:**
To start ZapBot, execute the following command in your terminal (from the root of your project folder):

    ```bash
    npm start
    ```

This command is configured in your package.json to execute ```nodemon src/index.js```, which will start your bot and monitor your code for changes during development.

**First Run: Authentication:**
The first time you run the bot (or if the session expires), a **QR Code** will be displayed in your terminal. Follow these steps to authenticate your WhatsApp account:

1. Open WhatsApp on your mobile phone.

2. Go to Settings (or Ajustes on iOS).

3. Select Linked Devices (or WhatsApp Web).

4. Tap Link a Device.

5. Scan the QR Code that appears in your terminal.

After successful authentication, the bot will be ready to operate, and the session will be automatically saved in the ```.wwebjs_auth/``` folder. In future runs, you won't need to scan the QR Code again, unless the session is disconnected by WhatsApp.


* **🛑 Stopping the Bot:** 
To stop the bot, press ```Ctrl + C``` in the terminal where it is running.

---


## Troubleshooting
* ```Error: Cannot find module './someModule'```:

    * Verify that all dependencies are correctly installed (npm install).

    * Check if the paths in your ```require()``` statements within your files (```src/index.js, src/commands/*.js, src/utils/*.js, src/config.js, src/cronJobs.js```) are correct. Remember that ```..``` moves up one directory level.

* **Bot doesn't save session / asks for QR Code every time:**

    * Ensure the ```.wwebjs_auth/``` folder was created at the root of your project.

    * Confirm that the user running the script has read and write permissions to the ```.wwebjs_auth/ folder.``` Try running your terminal as Administrator for the first authentication.

    * Temporarily disable "Controlled Folder Access" in Windows Defender or similar features in your antivirus.

    * Try deleting the contents of the .```wwebjs_auth/ folder and the node_modules/ ``` folder (and  ```package-lock.json``` ), then ``` run npm install```  again for a clean environment reset.

* **Commands don't respond:**

    * Check if the bot is logging ```Client is ready!``` in the console.

    * Verify that the command syntax is correct (e.g., ```!chat, !denilson```).

    * For administrator commands ```(!chats)```, make sure ```MY_NUMBER``` in ```src/config.js``` is configured with the correct ID of your personal contact.

* **Periodic sending not working:**

    * Verify that the ```GROUP_IDS_TO_SEND``` in ```src/config.js``` contains valid group IDs.

    * Check the bot's console for any error messages related to the periodic sending process.

---

## 📂 Project Structure 
For the bot to function correctly, your project structure should follow this pattern. This ```README``` assumes your main script ```index.js``` is inside the ```src/ folder.```


```bash
ZapBot/
├── src/                    # Source code of the bot
│   ├── index.js            # Main bot file (client initialization, event routing)
│   ├── commands/           # Logic for chat commands
│   │   ├── chatCommands.js # Handles !chat, !chats
│   │   ├── mediaCommands.js# Handles !denilson (and future media)
│   │   ├── miscCommands.js # Handles !teste
│   │   └── cronJobs.js     # Handles scheduled tasks (periodic sending) - if kept here
│   ├── utils/              # Utility functions
│   └── config.js           # Bot configurations (IDs, intervals, etc.)
├── .wwebjs_auth/           # WhatsApp Web session folder (will be created/used here)
├── img/                    # Folder for bot's images
│   ├── denilson.jpg
│   └── rijkaard.jpg
├── node_modules/           # Dependencies (generated by npm install)
├── .gitignore              # Ignores important folders for Git
├── package.json
└── README.md
```
---

## 🤝 Contribution
Feel free to explore, modify, and enhance this project. Suggestions and pull requests are welcome!

---
## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
