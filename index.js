const mineflayer = require('mineflayer');

// Configuration details for your bot
const bot = mineflayer.createBot({
  host: 'xkindomsmp.aternos.me',       
  port: 61913,                  
  username: 'ManuthBot',        
  auth: 'offline',              
  version: '1.20.1'             
});

// Anti-AFK Interval variable so we can clear it if needed
let afkInterval;

// Event: When the bot successfully joins the server
bot.on('spawn', () => {
  console.log('✅ Bot has successfully spawned in the server!');
  bot.chat('Hello everyone! I am a bot running 24/7 on Termux.');
  
  // Start the Anti-AFK routine
  startAntiAFK();
});

// Event: Auto-respond to chat messages
bot.on('chat', (username, message) => {
  if (username === bot.username) return;

  if (message === '!ping') {
    bot.chat(`Pong! Hello ${username}!`);
  }
});

// Event: Automatically reconnect if disconnected or kicked
bot.on('end', () => {
  console.log('❌ Disconnected! Attempting to reconnect in 10 seconds...');
  clearInterval(afkInterval); // Stop the AFK loop on disconnect
  setTimeout(() => {
    process.exit(); 
  }, 10000);
});

// Error handling to prevent crashes
bot.on('error', (err) => console.log('Error encountered: ', err));
bot.on('kicked', (reason) => console.log('Kicked from server: ', reason));


// --- Anti-AFK Movement Logic ---
function startAntiAFK() {
  // Clear any existing interval just in case
  clearInterval(afkInterval);

  console.log('🔄 Anti-AFK movement loop started.');

  afkInterval = setInterval(() => {
    // Generate a random number to decide which action to take
    const actions = ['forward', 'back', 'jump', 'look'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    switch (randomAction) {
      case 'forward':
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 500); // Walk forward for half a second
        break;

      case 'back':
        bot.setControlState('back', true);
        setTimeout(() => bot.setControlState('back', false), 500); // Walk backward for half a second
        break;

      case 'jump':
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 200); // Tap jump
        break;

      case 'look':
        // Turn the bot's head randomly (Yaw and Pitch)
        const yaw = (Math.random() * Math.PI * 2) - Math.PI;
        const pitch = (Math.random() * Math.PI / 2) - (Math.PI / 4);
        bot.look(yaw, pitch, true);
        break;
    }
  }, 30000); // Runs every 30 seconds (30000ms)
}

