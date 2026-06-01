const mineflayer = require('mineflayer');

// Configuration details for your bot
const bot = mineflayer.createBot({
  host: 'xkindomsmp.aternos.me',       // Replace with the server IP (e.g., 'my-server.aternos.me')
  port: 61913,                  // Replace with your server port (Default is 25565)
  username: 'ManuthBot',        // The in-game name for your bot
  auth: 'offline',              // Use 'offline' for cracked/non-premium servers, or 'microsoft' for official accounts
  version: '1.20.1'             // Set your server's exact Minecraft version
});

// Event: When the bot successfully joins the server
bot.on('spawn', () => {
  console.log('✅ Bot has successfully spawned in the server!');
  bot.chat('Hello everyone! I am a bot running 24/7 on Termux.');
});

// Event: Auto-respond to chat messages
bot.on('chat', (username, message) => {
  // Prevent the bot from responding to itself
  if (username === bot.username) return;

  // Simple trigger command
  if (message === '!ping') {
    bot.chat(`Pong! Hello ${username}!`);
  }
});

// Event: Automatically reconnect if disconnected or kicked
bot.on('end', () => {
  console.log('❌ Disconnected! Attempting to reconnect in 10 seconds...');
  setTimeout(() => {
    process.exit(); // Let a script wrapper or simple manual loop restart it, or re-run the file
  }, 10000);
});

// Error handling to prevent crashes
bot.on('error', (err) => console.log('Error encountered: ', err));
bot.on('kicked', (reason) => console.log('Kicked from server: ', reason));

// Add your bot logic here
