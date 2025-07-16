#!/usr/bin/env node

require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

async function generateCard() {
  // Check for required arguments
  const args = process.argv.slice(2);
  if (args.length < 4) {
    console.error('Usage: node test-gpt-image.js "<quote>" "<illustration-prompt>" "<visual-style>" "<typography-style>" [output-filename]');
    console.error('Example: node test-gpt-image.js "Be yourself" "Bo confidently standing with arms akimbo" "Modern style with bright colors" "Clean sans-serif typography" bo-card.png');
    console.error('\nGenerates a "Bo says:" themed card with:');
    console.error('- Character reference: Bo_the_wise.png');
    console.error('- Custom illustration based on provided prompt');
    console.error('- Specified visual style and typography');
    process.exit(1);
  }

  const quote = args[0];
  const illustrationPrompt = args[1]; 
  const visualStyle = args[2];
  const typographyStyle = args[3];
  const outputFilename = args[4] || `generated_cards/bo-card-${Date.now()}.png`;

  // Check if character reference image exists
  if (!fs.existsSync('./card_images/Bo_the_wise.png')) {
    console.error('Error: Character reference image not found: ./card_images/Bo_the_wise.png');
    process.exit(1);
  }

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY not found in environment variables.');
    console.error('Please add OPENAI_API_KEY=your_api_key_here to your .env file');
    process.exit(1);
  }

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG
  });

  // Declare variables outside try block for scope access
  let cardPrompt = '';
  
  try {
    console.log('🚀 Using GPT-Image-1 Edit API for Bo Says Card Generation...');
    console.log('💬 Quote:', quote);
    console.log('🐻 Character Reference: Bo_the_wise.png');
    console.log('🎨 Illustration Prompt:', illustrationPrompt);
    console.log('📜 Visual Style:', visualStyle);
    console.log('✍️ Typography:', typographyStyle);
    console.log('⏳ Generating themed card...');
    
    // Create comprehensive prompt for image edit API
    const editPrompt = `Create a wisdom card with the following specifications:

LAYOUT: 
- "Bo says:" as header text at the top
- Quote text in the center: "${quote}" (display only the quote text without author attribution)
- Decorative border around the entire card
- 2:3 portrait aspect ratio

CHARACTER: Use the reference image for Bo's character design - he is a fluffy brown bear with rounded ears, wise expression, and scholarly demeanor. Keep his exact appearance and bear characteristics.

ILLUSTRATION: ${illustrationPrompt}

VISUAL STYLE: ${visualStyle}

TYPOGRAPHY: ${typographyStyle}

TECHNICAL REQUIREMENTS:
- Professional, elegant design
- Clear, readable typography
- High quality illustration with harmonious color palette
- Decorative border that complements the overall design

Create a visually striking card where Bo's illustration demonstrates the quote's meaning.`;

    console.log('📝 Image edit prompt:');
    console.log(editPrompt);

    // Use image edit API with character reference only
    const boImageBuffer = fs.readFileSync('./card_images/Bo_the_wise.png');
    const boImageFile = new File([boImageBuffer], 'Bo_the_wise.png', { type: 'image/png' });
    
    const imageResponse = await openai.images.edit({
      model: "gpt-image-1",
      image: [boImageFile],
      prompt: editPrompt
    });

    const { b64_json, id } = imageResponse.data[0];
    console.log('✅ Image generated successfully!');
    console.log('🆔 Generation ID:', id);

    // Save the generated image from base64
    fs.writeFileSync(outputFilename, Buffer.from(b64_json, "base64"));
    console.log('💾 Image saved as:', outputFilename);

    // Display additional info
    console.log('\n📊 Card Generation Info:');
    console.log('- Model: GPT-Image-1 (Edit API)');
    console.log('- Size: 1024x1536 (2:3 aspect ratio)');
    console.log('- Quality: High');
    console.log('- Character Reference: Bo_the_wise.png');
    console.log('- Dynamic prompts provided externally');
    console.log('- Format: "Bo says:" themed quote card');
    console.log('- Style: Era-appropriate philosophical design');

  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    
    if (error.code === 'billing_hard_limit_reached') {
      console.error('💳 Billing limit reached. Please check your OpenAI account.');
    } else if (error.code === 'invalid_api_key') {
      console.error('🔑 Invalid API key. Please check your OPENAI_API_KEY in .env file.');
    } else if (error.code === 'content_policy_violation') {
      console.error('⚠️  Content policy violation. Please modify your prompt.');
    } else {
      console.error('❌ Failed to generate image with GPT-Image-1. No fallback configured.');
      process.exit(1);
    }
  }
}

// Add node-fetch if not available
async function ensureNodeFetch() {
  try {
    await import('node-fetch');
  } catch (error) {
    console.log('📦 Installing node-fetch...');
    const { execSync } = require('child_process');
    execSync('npm install node-fetch', { stdio: 'inherit' });
  }
}

// Run the script
(async () => {
  await ensureNodeFetch();
  await generateCard();
})();