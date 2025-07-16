# Bo Says Card Generator - Agent Usage Guide

## Overview
This guide instructs AI agents on how to intelligently use the Bo Says card generator script to create meaningful philosophical quote cards with the Bo character.

## Workflow Process

### 1. Request Analysis
When a human requests a card generation, you should:

**With Specific Quote:**
- Analyze the provided quote for philosophical tradition
- Research the quote's origin and context if needed
- Understand the core meaning and message

**Without Specific Quote:**
- Consider the human's preferences or context
- Select an appropriate philosophical quote
- Choose quotes that are meaningful, positive, and suitable for visual representation

### 2. Philosophical Analysis

Identify the philosophical tradition to determine authentic styling:

#### Ancient Greek Philosophy
- **Thinkers**: Socrates, Plato, Aristotle
- **Themes**: Virtue, wisdom, examined life, logic, ethics
- **Visual Style**: Marble textures, classical columns, olive branches, Mediterranean colors
- **Typography**: Classical serif fonts reminiscent of ancient inscriptions

#### Chinese Philosophy (Taoism/Confucianism)
- **Thinkers**: Lao Tzu, Confucius, Zhuangzi
- **Themes**: Journey, balance, nature, flow, harmony, steps
- **Visual Style**: Ink wash paintings, bamboo, mountains, soft watercolor aesthetics
- **Typography**: Calligraphy-inspired fonts with elegant brush strokes

#### Buddhist Philosophy
- **Thinkers**: Buddha, various Buddhist teachings
- **Themes**: Suffering, attachment, meditation, enlightenment, mindfulness
- **Visual Style**: Lotus flowers, golden/saffron colors, peaceful temples
- **Typography**: Serene, flowing fonts reminiscent of temple inscriptions

#### Roman Stoicism
- **Thinkers**: Marcus Aurelius, Seneca, Epictetus
- **Themes**: Duty, resilience, acceptance, virtue, strength
- **Visual Style**: Stone textures, imperial colors, classical architecture
- **Typography**: Strong, authoritative serif fonts

#### Modern Philosophy
- **Themes**: Work, relationships, personal growth, contemporary wisdom
- **Visual Style**: Clean, contemporary design with thoughtful colors
- **Typography**: Modern sans-serif or contemporary serif fonts

### 3. Illustration Design

Create illustration prompts that **cleverly demonstrate the quote's meaning**:

#### Effective Illustration Strategies:
- **Action-based**: Bo performing an action that embodies the quote
- **Symbolic**: Bo interacting with symbolic elements (mirrors, paths, objects)
- **Metaphorical**: Bo in scenarios that represent abstract concepts
- **Transformational**: Bo showing change, growth, or progression

#### Example Illustration Prompts:
- **"What we think, we become"**: Bo in meditation with thought bubbles transforming into lotus flowers
- **"The journey begins with a single step"**: Bo taking a confident step on a winding path toward mountains
- **"Be yourself"**: Bo confidently standing with arms akimbo, radiating self-assurance
- **"Let go of attachment"**: Bo peacefully releasing objects that float away as light
- **"Courage is not the absence of fear"**: Bo bravely facing a shadow while visibly nervous but determined

### 4. Generator Script Usage

Use the script with this exact format:
```bash
node test-gpt-image.js "<quote>" "<illustration-prompt>" "<visual-style>" "<typography-style>" [output-filename]
```

#### Parameter Guidelines:

**Quote Parameter:**
- Include only the quote text, no author attribution
- Keep it concise and meaningful
- Remove any extra punctuation that might interfere

**Illustration Prompt:**
- Be specific about Bo's action and pose
- Include environmental elements that support the meaning
- Mention symbolic objects or effects when relevant
- Ensure it demonstrates the quote's core message

**Visual Style:**
- Match the philosophical tradition authentically
- Include specific color palettes and design elements
- Mention textures, patterns, and decorative elements
- Ensure period-appropriate aesthetics

**Typography Style:**
- Match the philosophical era and tradition
- Specify font characteristics (serif, sans-serif, calligraphy, etc.)
- Include descriptive terms (flowing, strong, elegant, etc.)
- Ensure readability and authenticity

## Complete Example Workflow

### Human Request: "Create a card about resilience"

**Agent Thinking Process:**
1. **Quote Selection**: "Fall seven times, rise eight" (Japanese proverb)
2. **Tradition Analysis**: Japanese/Eastern philosophy - resilience theme
3. **Style Decision**: Eastern philosophical with Japanese aesthetics
4. **Illustration Concept**: Bo falling and getting back up, showing determination

**Agent Implementation:**
```bash
node test-gpt-image.js "Fall seven times, rise eight" "Bo getting back up from the ground with determination, surrounded by cherry blossoms, showing resilience and perseverance through multiple attempts" "Japanese philosophical style with cherry blossoms, soft pink and earth tones, minimalist aesthetic with natural elements" "Japanese calligraphy-inspired typography with elegant, flowing brush-stroke fonts" resilience-card.png
```

## Best Practices

### Quote Selection
- Choose quotes that are visually representable
- Avoid overly abstract or complex concepts
- Prefer positive, uplifting messages
- Ensure quotes are culturally appropriate

### Illustration Design
- Avoid generic "reading" or "thinking" poses
- Make Bo's action directly relate to the quote's meaning
- Include environmental elements that enhance the message
- Consider symbolic objects that support the theme

### Visual Consistency
- Bo must always remain a fluffy brown bear
- Maintain character consistency across all styles
- Ensure illustrations are family-friendly and positive
- Balance visual elements with text readability

### Technical Considerations
- File names should be descriptive and appropriate
- Check that all required parameters are provided
- Ensure proper quote formatting (no extra quotation marks)
- Verify that illustration prompts are clear and specific

## Common Philosophical Themes & Approaches

### Personal Growth
- **Quotes**: Self-improvement, confidence, authenticity
- **Illustrations**: Bo growing, transforming, or standing confidently
- **Style**: Usually modern or universal philosophical

### Relationships & Compassion
- **Quotes**: Friendship, kindness, helping others
- **Illustrations**: Bo interacting with other animals, sharing, helping
- **Style**: Warm, inclusive color palettes

### Perseverance & Challenge
- **Quotes**: Overcoming obstacles, persistence, courage
- **Illustrations**: Bo facing challenges, climbing, pushing forward
- **Style**: Dynamic compositions with movement

### Mindfulness & Peace
- **Quotes**: Present moment, inner peace, acceptance
- **Illustrations**: Bo in peaceful settings, meditation, harmony with nature
- **Style**: Buddhist or Eastern philosophical aesthetics

### Wisdom & Learning
- **Quotes**: Knowledge, growth, understanding
- **Illustrations**: Bo discovering, exploring, having "aha" moments
- **Style**: Classical philosophical traditions

## Troubleshooting

### Common Issues:
1. **Generic Illustrations**: If Bo appears in generic poses, make the illustration prompt more specific and action-oriented
2. **Style Mismatch**: Ensure visual style and typography match the same philosophical tradition
3. **Poor Text Readability**: Adjust typography style to be more specific about legibility requirements
4. **Character Inconsistency**: Always emphasize that Bo is a "fluffy brown bear" in the prompt

### Quality Checks:
- Does the illustration cleverly demonstrate the quote's meaning?
- Is the visual style authentic to the philosophical tradition?
- Does the typography match the era and remain readable?
- Is Bo's character consistent with previous generations?

## Output Review

After generation, verify:
- ✅ Quote text is clean and properly displayed
- ✅ "Bo says:" header is prominent and well-formatted
- ✅ Illustration meaningfully represents the quote
- ✅ Visual style is authentic to the philosophical tradition
- ✅ Typography is appropriate and readable
- ✅ Bo maintains his character consistency as a fluffy brown bear
- ✅ Overall composition is professional and harmonious

## Final Notes

Remember: Your role as an AI agent is to provide the intelligence and context analysis that the generator script cannot do. You are responsible for:
- Understanding philosophical traditions
- Creating meaningful illustration concepts
- Matching visual styles to eras
- Ensuring cultural authenticity
- Making creative connections between quotes and visuals

The generator script handles only the technical image creation - all the intelligence and creativity comes from your analysis and prompt crafting.