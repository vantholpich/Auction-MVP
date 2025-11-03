# Friend Auction - Apple App Store Deployment Guide

## Prerequisites

### 1. Apple Developer Account
- **Required:** Apple Developer Program membership ($99/year)
- **Sign up:** https://developer.apple.com/programs/
- **Status:** Must be active and in good standing

### 2. Development Environment
- **macOS:** Required for iOS app submission
- **Xcode:** Latest version from Mac App Store
- **EAS CLI:** `npm install -g eas-cli`

## Step-by-Step Deployment Process

### Phase 1: Prepare Assets

#### 1.1 App Icon (Required)
Create an app icon at **1024x1024 pixels**:
- **Format:** PNG (no transparency)
- **Content:** Should represent your Friend Auction app
- **Save as:** `assets/icon.png`

#### 1.2 Splash Screen (Required)
Create a splash screen image:
- **Recommended size:** 1284x2778 pixels (iPhone 14 Pro Max)
- **Format:** PNG
- **Background:** Match your app theme (#fdf2f8)
- **Save as:** `assets/splash.png`

#### 1.3 App Store Screenshots (Required)
You'll need screenshots for different device sizes:
- **iPhone 6.7"** (iPhone 14 Pro Max): 1290x2796
- **iPhone 6.5"** (iPhone 14 Plus): 1284x2778
- **iPhone 5.5"** (iPhone 8 Plus): 1242x2208
- **iPad Pro 12.9"**: 2048x2732

### Phase 2: Configure App Store Connect

#### 2.1 Create App in App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Click **"My Apps"** → **"+"** → **"New App"**
3. Fill in app information:
   - **Platform:** iOS
   - **Name:** Friend Auction
   - **Primary Language:** English
   - **Bundle ID:** com.yourcompany.friendauction
   - **SKU:** friend-auction-app-001

#### 2.2 App Information
- **Category:** Social Networking
- **Subcategory:** Social Networking
- **Content Rights:** Check if you have all rights
- **Age Rating:** Complete the questionnaire (likely 17+ due to social features)

#### 2.3 Pricing and Availability
- **Price:** Free
- **Availability:** All countries (or select specific ones)

### Phase 3: Build and Submit

#### 3.1 Install EAS CLI
```bash
npm install -g eas-cli
```

#### 3.2 Login to Expo
```bash
eas login
```

#### 3.3 Configure EAS Build
```bash
eas build:configure
```

#### 3.4 Build for iOS
```bash
eas build --platform ios
```

#### 3.5 Submit to App Store
```bash
eas submit --platform ios
```

### Phase 4: App Store Listing

#### 4.1 App Store Information
- **App Name:** Friend Auction
- **Subtitle:** Connect friends through fun auctions
- **Description:** 
```
Discover and connect with friends in a fun, auction-style format! 

Friend Auction lets you:
• Browse friend profiles in an engaging card-based interface
• Create profiles for your friends to help them meet new people
• Swipe through potential connections
• Upload photos and detailed profiles
• Connect people in your social circle

Perfect for:
- Helping shy friends meet new people
- Expanding your social network
- Creating fun connections within friend groups
- Social matchmaking with a twist

Features:
✓ Beautiful, intuitive card-based interface
✓ Photo uploads and detailed profiles
✓ Swipe-based interaction system
✓ Real-time profile creation
✓ Privacy-focused design

Start connecting your friends today!
```

- **Keywords:** friends, social, networking, connections, dating, matchmaking, profiles
- **Support URL:** Your website or support email
- **Marketing URL:** Your app's website (optional)

#### 4.2 App Review Information
- **Contact Information:** Your email and phone
- **Review Notes:** 
```
This is a social networking app that allows users to create profiles for their friends and browse other friend profiles in a card-based interface. 

Key features:
- Users can create profiles for their friends (with permission)
- Browse profiles in a Tinder-like swipe interface
- Upload photos using device camera/photo library
- No direct messaging or payment features
- All data stored securely in Supabase

Test Account: Not required - app works without authentication
```

### Phase 5: Review Process

#### 5.1 App Review Guidelines
Ensure your app complies with:
- **Privacy:** Clear data usage (you collect photos, names, basic info)
- **Content:** No inappropriate content
- **Functionality:** App works as described
- **Design:** Follows iOS Human Interface Guidelines

#### 5.2 Common Rejection Reasons to Avoid
- **Incomplete Information:** Ensure all metadata is filled
- **Broken Links:** Test all URLs you provide
- **Privacy Policy:** Required for apps that collect data
- **Permissions:** Clearly explain why you need camera/photo access

### Phase 6: Post-Submission

#### 6.1 Review Timeline
- **Typical:** 24-48 hours
- **Complex apps:** Up to 7 days
- **Status:** Monitor in App Store Connect

#### 6.2 If Rejected
- **Read feedback carefully**
- **Fix issues mentioned**
- **Resubmit with explanations**

#### 6.3 If Approved
- **App goes live automatically** (unless you set a specific release date)
- **Monitor reviews and ratings**
- **Prepare for updates**

## Required Files Checklist

- [ ] App icon (1024x1024 PNG) → `assets/icon.png`
- [ ] Splash screen → `assets/splash.png`
- [ ] App Store screenshots (multiple sizes)
- [ ] Privacy Policy (if collecting user data)
- [ ] App Store description and metadata
- [ ] Apple Developer Account (active)
- [ ] Bundle identifier configured
- [ ] Permissions properly declared

## Estimated Timeline

- **Asset Creation:** 1-2 days
- **App Store Connect Setup:** 1 day
- **Build and Submit:** 1 day
- **Apple Review:** 1-7 days
- **Total:** 4-10 days

## Costs

- **Apple Developer Program:** $99/year
- **EAS Build:** Free tier available, paid plans for more builds
- **Optional:** Design services for professional assets

## Support

- **Apple Developer Support:** https://developer.apple.com/support/
- **Expo Documentation:** https://docs.expo.dev/
- **App Store Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/

## Next Steps

1. **Create Apple Developer Account** (if not done)
2. **Design app icon and splash screen**
3. **Take app screenshots**
4. **Follow the step-by-step process above**
5. **Submit for review**

Good luck with your App Store submission! 🚀