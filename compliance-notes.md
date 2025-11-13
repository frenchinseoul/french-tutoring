## Korea-Only Targeting
- **Public-facing notices:** Every hero, CTA, FAQ, and footer now states that only Korea-based adults (19+) with domestic proof of residence/employment may enroll; the `.notice` banner makes the restriction unmissable.
- **Operational checks:** Intake forms and Kakao/email replies must request 주민등록증, 재직증명, or 학적 증빙 plus a Korean phone number before confirming schedules; any inquiry lacking proof gets marked “Rejected – overseas/minor” in the CRM.
- **Automatic rejection signals:** Overseas IPs/VPNs, agency domains, or underage cues trigger canned responses and are recorded in the inquiry log (timestamp, IP hash, reason) to prove enforcement.
- **No overseas ads:** Campaign targeting in Kakao, Naver, Meta, and Google Ads remains geo-fenced to Korea-only locations with age 19+; screenshots of ad-platform settings should be exported monthly.

## Cookieless Google Analytics 4
- **Consent Mode defaults:** Each page loads GA4 with `gtag('consent','default', {ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', analytics_storage:'denied'})` before `gtag('js', new Date())`, so GA never drops cookies nor upgrades consent.
- **Privacy-friendly config:** `gtag('config','G-CJ2R92X66J', {anonymize_ip:true, allow_google_signals:false, allow_ad_personalization_signals:false})` keeps GA cookieless and blocks Google signals/ads data.
- **Verification artifacts:** Capture DevTools Network screenshots showing GA requests with `gcs=G100` and no `_ga` cookies, plus Consent Mode summary from Tag Assistant; repeat after any release.
- **Footer disclosure:** The “Korea-only & cookieless GA” line documents that only anonymous GA4 pings run, supporting the decision to avoid a consent banner.

## Records Proving No Opt-In Banner Needed
- **Technical evidence:** Store copies of the GA snippet, Tag Assistant exports, and DevTools HAR files demonstrating denied consent and absence of analytics cookies.
- **Policy linkage:** Archive screenshots of the footer notice, Korean privacy-policy modal, and hero/CTA disclaimers to show that visitors are informed without interaction.
- **Inquiry logs:** Maintain CSV/CRM exports summarizing rejected overseas/minor inquiries (date, channel, rejection reason) and the domestic-proof checklist used before onboarding.
- **Ad-platform settings:** Keep monthly PDFs or screenshots of geo/age targeting that prove outreach stays inside Korea; pair them with bank statements showing no foreign ad spend.
- **Review cadence:** Note in the ops runbook that compliance artifacts (logs, screenshots, HAR files) are refreshed every quarter so regulators can see ongoing diligence.
