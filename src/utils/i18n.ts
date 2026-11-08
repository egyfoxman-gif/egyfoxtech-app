import { Language } from '../types';

export const translations = {
  ar: {
    appName: 'Egyfox Technology',
    tagline: 'منصة التقنية والعتاد والذكاء الاصطناعي',
    // Bottom navigation
    tabVideos: 'الفيديوهات',
    tabHome: 'الرئيسية',
    tabPlaylists: 'قوائم التشغيل',
    tabNotifications: 'الإشعارات',
    tabChannel: 'عن القناة',
    
    // Top Bar
    searchPlaceholder: 'ابحث في فيديوهات القناة...',
    subscribeBtn: 'اشتراك في يوتيوب',
    subscribed: 'مشترك بالقناة ✓',
    
    // Categories
    catAll: 'كل الفيديوهات',
    catCards: 'فيزا وكروت دولية',
    catEbanks: 'بنوك إلكترونية ودولارية',
    catInstapay: 'انستاباي وبنوك مصر',
    catInvesting: 'تداول وبورصة عالمية',
    catFreelance: 'العمل الحر وسحب الأرباح',
    catTutorials: 'شروحات تقنية وبرامج',
    
    // Videos tab
    videosHeader: 'مكتبة الفيديوهات',
    videosSubtitle: 'تصفح جميع فيديوهات القناة وشاهدها مباشرة وبدون إعلانات مزعجة',
    sortBy: 'ترتيب حسب',
    sortLatest: 'الأحدث أولاً',
    sortPopular: 'الأكثر مشاهدة',
    resultsCount: 'فيديو متاح',
    noVideosFound: 'لم يتم العثور على فيديوهات تطابق بحثك',
    resetFilters: 'إعادة ضبط الفلاتر',
    
    // Video Card
    watchNow: 'مشاهدة الآن',
    playInApp: 'تشغيل داخل التطبيق',
    openOnYoutube: 'فتح في تطبيق يوتيوب',
    shareVideo: 'مشاركة الفيديو',
    linkCopied: 'تم نسخ رابط الفيديو إلى الحافظة!',
    addToFavs: 'حفظ للمفضلة',
    removeFromFavs: 'إزالة من المفضلة',
    inFavorites: 'في المفضلة',
    
    // Player Modal
    closePlayer: 'إغلاق المشغل',
    minimizePlayer: 'تصغير (نافذة عائمة)',
    expandPlayer: 'تكبير الفيديو',
    relatedVideos: 'فيديوهات ذات صلة من القناة',
    viewsCount: 'مشاهدة',
    likesCount: 'إعجاب',
    publishedOn: 'نُشر',
    channelName: 'Egyfox Technology',
    
    // Home tab
    featuredVideo: 'الفيديو المميز لهذا الأسبوع',
    latestUploads: 'أحدث مقاطع القناة',
    seeAllVideos: 'عرض كل الفيديوهات',
    popularPlaylists: 'سلاسل وبرامج القناة',
    channelStats: 'إحصائيات القناة',
    subscribersCount: 'مشترك',
    totalViewsText: 'إجمالي المشاهدات',
    totalVideosText: 'مقطع فيديو',
    
    // Playlists tab
    playlistsHeader: 'سلاسل وقوائم التشغيل',
    playlistsSubtitle: 'مجموعات مرتبة من الشروحات والدورات المتخصصة خطوة بخطوة',
    videosInPlaylist: 'فيديوهات داخل السلسلة',
    explorePlaylist: 'استعراض السلسلة',
    
    // Notifications tab
    notifHeader: 'مركز الإشعارات والتنبيهات',
    notifSubtitle: 'استقبل تنبيهاً فورياً عند رفع أي فيديو جديد من القناة',
    notifPermissionTitle: 'تفعيل تنبيهات المتصفح والجهاز',
    notifPermissionDesc: 'سيرسل لك التطبيق إشعاراً صوتياً ورسالة بمجرد رفع فيديو جديد',
    enableNotifs: 'تفعيل الإشعارات الآن',
    notifsEnabled: 'الإشعارات مفعلة ✓',
    notifsDisabled: 'الإشعارات معطلة',
    soundAlerts: 'الصوت التنبيهي',
    soundOn: 'مفعل',
    soundOff: 'مكتوم',
    markAllRead: 'تحديد الكل كمقروء',
    clearNotifs: 'مسح التنبيهات',
    testNotifBtn: 'تجربة إرسال إشعار فيديو جديد',
    testNotifSuccess: 'تم إطلاق إشعار تجريبي بصوت Egyfox!',
    emptyNotifs: 'لا توجد تنبيهات حالياً',
    
    // Channel / Creator Studio Tab
    aboutChannel: 'عن قناة Egyfox Technology',
    creatorStudio: 'إدارة واستوديو الفيديوهات',
    creatorStudioDesc: 'أضف رابط فيديو من يوتيوب للقناة وسيظهر فوراً لجميع زوار التطبيق مع إشعار',
    addVideoBtn: 'إضافة فيديو جديد',
    videoUrlLabel: 'رابط الفيديو على يوتيوب أو ID',
    videoUrlPlaceholder: 'مثال: https://youtu.be/xxxxxx أو معرف الفيديو',
    videoTitleLabel: 'عنوان الفيديو بالعربية',
    videoTitleEnLabel: 'عنوان الفيديو بالإنجليزية (اختياري)',
    videoCategoryLabel: 'قسم الفيديو',
    videoDescLabel: 'وصف الفيديو',
    sendNotifCheckbox: 'إرسال إشعار للمتابعين بهذا الفيديو الجديد فوراً',
    submitAddVideo: 'إضافة ونشر في التطبيق',
    videoAddedSuccess: 'تم إضافة الفيديو بنجاح وأُرسل إشعار للمتابعين!',
    invalidUrlError: 'يرجى إدخال رابط يوتيوب صحيح أو معرف صالح (11 حرف)',
    officialLinks: 'روابط وحسابات القناة الرسمية',
    appSettings: 'إعدادات التطبيق',
    languageToggle: 'اللغة / Language',
    themeToggle: 'المظهر',
    themeDark: 'الوضع الليلي (Dark)',
    themeLight: 'الوضع الفاتح (White)',
    resetDataBtn: 'استعادة البيانات الافتراضية',
    resetDataConfirm: 'تمت استعادة الفيديوهات والإشعارات الافتراضية بنجاح.',
  },
  en: {
    appName: 'Egyfox Technology',
    tagline: 'Tech Hardware, AI & Engineering Hub',
    // Bottom navigation
    tabVideos: 'Videos',
    tabHome: 'Home',
    tabPlaylists: 'Playlists',
    tabNotifications: 'Notifications',
    tabChannel: 'Channel',
    
    // Top Bar
    searchPlaceholder: 'Search channel videos...',
    subscribeBtn: 'Subscribe on YouTube',
    subscribed: 'Subscribed ✓',
    
    // Categories
    catAll: 'All Videos',
    catCards: 'Visa & Digital Cards',
    catEbanks: 'Digital & USD Banks',
    catInstapay: 'InstaPay & Egypt Banks',
    catInvesting: 'Stock Market & Investing',
    catFreelance: 'Freelance & Payouts',
    catTutorials: 'Tech Tutorials & Software',
    
    // Videos tab
    videosHeader: 'Video Library',
    videosSubtitle: 'Explore all channel uploads and watch them directly inside the app',
    sortBy: 'Sort by',
    sortLatest: 'Latest First',
    sortPopular: 'Most Viewed',
    resultsCount: 'videos found',
    noVideosFound: 'No videos matching your search query',
    resetFilters: 'Reset Filters',
    
    // Video Card
    watchNow: 'Watch Now',
    playInApp: 'Play In-App',
    openOnYoutube: 'Open in YouTube',
    shareVideo: 'Share Video',
    linkCopied: 'Video link copied to clipboard!',
    addToFavs: 'Add to Favorites',
    removeFromFavs: 'Remove from Favorites',
    inFavorites: 'In Favorites',
    
    // Player Modal
    closePlayer: 'Close Player',
    minimizePlayer: 'Minimize (Picture-in-Picture)',
    expandPlayer: 'Expand Player',
    relatedVideos: 'Related Videos from Egyfox Tech',
    viewsCount: 'views',
    likesCount: 'likes',
    publishedOn: 'Published',
    channelName: 'Egyfox Technology',
    
    // Home tab
    featuredVideo: 'Featured Video of the Week',
    latestUploads: 'Latest Uploads',
    seeAllVideos: 'See All Videos',
    popularPlaylists: 'Featured Playlists & Series',
    channelStats: 'Channel Statistics',
    subscribersCount: 'Subscribers',
    totalViewsText: 'Total Views',
    totalVideosText: 'Uploaded Videos',
    
    // Playlists tab
    playlistsHeader: 'Playlists & Series',
    playlistsSubtitle: 'Curated courses and series organized step by step',
    videosInPlaylist: 'videos in series',
    explorePlaylist: 'Browse Series',
    
    // Notifications tab
    notifHeader: 'Notifications & Alerts',
    notifSubtitle: 'Get notified the instant a new video is published on Egyfox Tech',
    notifPermissionTitle: 'Browser & System Push Notifications',
    notifPermissionDesc: 'Receive audible alerts whenever a fresh video is uploaded',
    enableNotifs: 'Enable Notifications Now',
    notifsEnabled: 'Notifications Active ✓',
    notifsDisabled: 'Notifications Disabled',
    soundAlerts: 'Chime Sound',
    soundOn: 'Enabled',
    soundOff: 'Muted',
    markAllRead: 'Mark All as Read',
    clearNotifs: 'Clear All',
    testNotifBtn: 'Test New Video Alert Chime',
    testNotifSuccess: 'Sent test notification with Egyfox chime sound!',
    emptyNotifs: 'No notifications at the moment',
    
    // Channel / Creator Studio Tab
    aboutChannel: 'About Egyfox Technology',
    creatorStudio: 'Creator Studio & Video Manager',
    creatorStudioDesc: 'Add any YouTube video link to display it instantly in the app with follower alerts',
    addVideoBtn: 'Add New Video',
    videoUrlLabel: 'YouTube URL or Video ID',
    videoUrlPlaceholder: 'e.g. https://youtu.be/xxxxxx or 11-char ID',
    videoTitleLabel: 'Video Title (Arabic)',
    videoTitleEnLabel: 'Video Title (English - optional)',
    videoCategoryLabel: 'Category',
    videoDescLabel: 'Description',
    sendNotifCheckbox: 'Broadcast instant notification to app users',
    submitAddVideo: 'Add Video & Broadcast',
    videoAddedSuccess: 'Video added successfully and notification sent to users!',
    invalidUrlError: 'Please enter a valid YouTube URL or an 11-character video ID',
    officialLinks: 'Official Channel Links',
    appSettings: 'Application Settings',
    languageToggle: 'Language / اللغة',
    themeToggle: 'Appearance',
    themeDark: 'Dark Mode',
    themeLight: 'White / Light Mode',
    resetDataBtn: 'Restore Default Sample Data',
    resetDataConfirm: 'Default video library and notifications restored.',
  }
};
