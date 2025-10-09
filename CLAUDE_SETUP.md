# Claude 4.5 Chatbot Setup Guide

## ⚠️ IMPORTANT SECURITY NOTE

**The API key shared in the conversation should be rotated immediately for security.**

1. Go to https://console.anthropic.com/settings/keys
2. Delete the exposed key
3. Generate a new API key

## AWS Amplify Environment Variable Setup

To enable the Claude chatbot in your deployed application:

### Option 1: AWS Console (Recommended)

1. Go to [AWS Amplify Console](https://ap-south-1.console.aws.amazon.com/amplify/home?region=ap-south-1#/d2aialytikk5qc)
2. Click on **Environment variables** in the left sidebar
3. Click **Manage variables**
4. Add new variable:
   - **Variable name**: `ANTHROPIC_API_KEY`
   - **Value**: Your new Anthropic API key (starts with `sk-ant-api03-...`)
5. Click **Save**
6. Redeploy the application

### Option 2: AWS CLI

```bash
aws amplify update-app \
  --app-id d2aialytikk5qc \
  --environment-variables ANTHROPIC_API_KEY=your-new-api-key-here \
  --region ap-south-1
```

Then trigger a new deployment:

```bash
aws amplify start-job \
  --app-id d2aialytikk5qc \
  --branch-name main \
  --job-type RELEASE
```

## Local Development

For local testing, the API key is already configured in `.env.local`.

**DO NOT commit `.env.local` to git** (it's already in `.gitignore`).

## Testing the Chatbot

1. Navigate to **AI Agent Console** tab
2. Click **Chat with Claude** toggle
3. Ask questions like:
   - "How do I troubleshoot high CPU on FTD?"
   - "Explain SNMP polling impact on firewall performance"
   - "What causes packet loss on firewall interfaces?"

## Features

- Real Claude 4.5 Sonnet integration
- Specialized for Cisco firewall management
- Conversation history maintained
- Expert troubleshooting assistance
- Security policy recommendations

## API Usage & Costs

- Model: `claude-sonnet-4-20250514`
- Pricing: ~$3 per million input tokens, ~$15 per million output tokens
- Monitor usage at: https://console.anthropic.com/settings/usage

## Security Best Practices

✅ **DO:**
- Store API keys in environment variables
- Rotate keys regularly
- Monitor API usage
- Use separate keys for dev/prod

❌ **DON'T:**
- Hardcode API keys in source code
- Commit API keys to git
- Share API keys in chat/email
- Use the same key across multiple projects

---

**Need Help?**
- Anthropic Docs: https://docs.anthropic.com/
- Support: https://console.anthropic.com/settings/support
