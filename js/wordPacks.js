/**
 * Word Packs - All categories with 20+ words each in English & Kurdish
 */
const WordPacks = (() => {
    const categories = {
        locations: {
            icon: 'location',
            color: '#a855f7',
            words: {
                en: ['Hospital', 'Airport', 'Beach', 'Library', 'Museum', 'Restaurant', 'School', 'Stadium', 'Cinema', 'Park', 'Hotel', 'Mall', 'Bank', 'Mosque', 'Cemetery', 'Prison', 'Farm', 'Castle', 'Train Station', 'Zoo', 'Gym', 'Theater', 'Bakery', 'Gas Station', 'Playground'],
                ku: ['نەخۆشخانە', 'فڕۆکەخانە', 'کەنار', 'کتێبخانە', 'مۆزەخانە', 'چێشتخانە', 'قوتابخانە', 'یاریگا', 'سینەما', 'پارک', 'هوتێل', 'مارکێت', 'بانک', 'مزگەوت', 'گۆڕستان', 'زیندان', 'کێڵگە', 'قەڵا', 'وێستگەی شەمەندەفەر', 'باخچەی ئاژەڵان', 'یاریگای وەرزشی', 'شانۆ', 'نانەوا', 'وێستگەی بەنزین', 'یاریگای منداڵان']
            }
        },
        food: {
            icon: 'food',
            color: '#f97316',
            words: {
                en: ['Pizza', 'Sushi', 'Burger', 'Ice Cream', 'Chocolate', 'Pasta', 'Salad', 'Steak', 'Soup', 'Sandwich', 'Pancake', 'Donut', 'Cake', 'Popcorn', 'Fries', 'Taco', 'Coffee', 'Tea', 'Lemonade', 'Smoothie', 'Kebab', 'Rice', 'Bread', 'Cheese', 'Honey'],
                ku: ['پیتزا', 'سوشی', 'بەرگەر', 'ئایسکریم', 'چکلێت', 'پاستا', 'سەڵاتە', 'ستیک', 'شۆربا', 'ساندویچ', 'پانکێک', 'دۆنات', 'کێک', 'پاپکۆرن', 'پەتاتەی سوورکراو', 'تاکۆ', 'قاوە', 'چا', 'لیمۆنا', 'سموسی', 'کەباب', 'برنج', 'نان', 'پەنیر', 'هەنگوین']
            }
        },
        animals: {
            icon: 'animal',
            color: '#10b981',
            words: {
                en: ['Lion', 'Eagle', 'Dolphin', 'Elephant', 'Snake', 'Butterfly', 'Wolf', 'Bear', 'Penguin', 'Shark', 'Horse', 'Cat', 'Dog', 'Rabbit', 'Fox', 'Tiger', 'Owl', 'Parrot', 'Turtle', 'Monkey', 'Deer', 'Whale', 'Crocodile', 'Bee', 'Kangaroo'],
                ku: ['شێر', 'ھەڵۆ', 'دەلفین', 'فیل', 'مار', 'پەپوولە', 'گورگ', 'ورچ', 'پینگوین', 'شارک', 'ئەسپ', 'پشیلە', 'سەگ', 'کەروێشک', 'ڕێوی', 'بەور', 'بووم', 'توتی', 'کوسە', 'مەیمون', 'ئاسک', 'نەهەنگ', 'تمساح', 'هەنگ', 'کانگرۆ']
            }
        },
        movies: {
            icon: 'movie',
            color: '#ec4899',
            words: {
                en: ['Horror', 'Comedy', 'Action', 'Romance', 'Animation', 'Sci-Fi', 'Documentary', 'Thriller', 'Drama', 'Fantasy', 'Western', 'Musical', 'Mystery', 'Superhero', 'War Film', 'Cartoon', 'Silent Film', 'Sequel', 'Prequel', 'Series', 'Sitcom', 'Reality Show', 'Talk Show', 'Game Show', 'News'],
                ku: ['ترسناک', 'کۆمیدی', 'ئاکشن', 'ڕۆمانسی', 'ئەنیمەیشن', 'زانستی خەیاڵی', 'دۆکیومێنتاری', 'سەرنجڕاکێش', 'درامە', 'خەیاڵی', 'وێسترن', 'میوزیکڵ', 'سیری', 'سوپەرهیرۆ', 'فیلمی جەنگ', 'کارتۆن', 'فیلمی بێدەنگ', 'بەشی دووەم', 'پێش بەش', 'زنجیرە', 'سیتکۆم', 'ڕیالیتی شۆ', 'تۆک شۆ', 'گەیم شۆ', 'هەواڵ']
            }
        },
        sports: {
            icon: 'sport',
            color: '#6366f1',
            words: {
                en: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Boxing', 'Cycling', 'Golf', 'Hockey', 'Baseball', 'Volleyball', 'Wrestling', 'Skiing', 'Surfing', 'Archery', 'Badminton', 'Karate', 'Marathon', 'Gymnastics', 'Skateboarding', 'Fencing', 'Rugby', 'Cricket', 'Table Tennis', 'Climbing', 'Handball'],
                ku: ['تۆپی پێ', 'باسکەتبۆڵ', 'تێنیس', 'مەلوانی', 'بۆکس', 'پاسکیلسوازی', 'گۆڵف', 'هۆکی', 'بەیسبۆڵ', 'ڤۆلیبۆڵ', 'زۆرانبازی', 'سکی', 'سێرفینگ', 'تیراندازی', 'بادمینتۆن', 'کاراتە', 'ماراسۆن', 'جیمناستیک', 'سکەیتبۆرد', 'شیربازی', 'ڕەگبی', 'کریکت', 'تێنیسی مێز', 'شاخەوانی', 'هاندبۆڵ']
            }
        },
        jobs: {
            icon: 'job',
            color: '#22d3ee',
            words: {
                en: ['Doctor', 'Teacher', 'Chef', 'Pilot', 'Firefighter', 'Police Officer', 'Engineer', 'Nurse', 'Dentist', 'Lawyer', 'Farmer', 'Artist', 'Actor', 'Musician', 'Photographer', 'Journalist', 'Architect', 'Mechanic', 'Barber', 'Electrician', 'Plumber', 'Translator', 'Scientist', 'Programmer', 'Pharmacist'],
                ku: ['دکتۆر', 'مامۆستا', 'چێشتلێنەر', 'فڕۆکەوان', 'ئاگرکوژێنەرەوە', 'ئەفسەری پۆلیس', 'ئەندازیار', 'پەرستار', 'ددانساز', 'پارێزەر', 'جوتیار', 'هونەرمەند', 'ئەکتەر', 'میوزیکژەن', 'وێنەگر', 'ڕۆژنامەوان', 'تەلارساز', 'ئامێرچاککەر', 'دەلاک', 'کارەباچاککەر', 'لوولەکاری', 'وەرگێڕ', 'زانایاری', 'بەرنامەساز', 'دەرمانساز']
            }
        },
        school: {
            icon: 'school',
            color: '#f59e0b',
            words: {
                en: ['Mathematics', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology', 'Literature', 'Art Class', 'Music Class', 'Gym Class', 'Homework', 'Exam', 'Textbook', 'Notebook', 'Pencil', 'Backpack', 'Blackboard', 'Principal', 'Graduation', 'Scholarship', 'Library Card', 'Science Lab', 'Field Trip', 'Report Card', 'Lunch Break'],
                ku: ['بیرکاری', 'مێژوو', 'جوگرافیا', 'فیزیا', 'کیمیا', 'بایۆلۆجی', 'وێژە', 'وانەی هونەر', 'وانەی مۆسیقا', 'وانەی وەرزش', 'ئەرکی ماڵەوە', 'تاقیکردنەوە', 'کتێبی وانە', 'دەفتەر', 'پێنووس', 'جانتا', 'تەختەی ڕەش', 'بەڕێوەبەر', 'دەرچوون', 'بورسە', 'کارتی کتێبخانە', 'تاقیگەی زانست', 'گەشتی مەیدانی', 'کارنامە', 'پشووی نانی نیوەڕۆ']
            }
        },
        tech: {
            icon: 'tech',
            color: '#8b5cf6',
            words: {
                en: ['Smartphone', 'Laptop', 'Robot', 'Internet', 'Satellite', 'Drone', 'Virtual Reality', 'Bluetooth', 'Wi-Fi', 'USB Drive', 'Printer', 'Camera', 'Headphones', 'Smartwatch', 'GPS', 'Battery', 'Charger', 'Software', 'Website', 'Social Media', 'Video Call', 'Password', 'Cloud Storage', 'Artificial Intelligence', 'Keyboard'],
                ku: ['مۆبایل', 'لاپتۆپ', 'ڕۆبۆت', 'ئینتەرنێت', 'سەتەلایت', 'درۆن', 'ڕاستیی خەیاڵی', 'بلوتووس', 'وای فای', 'فلاش', 'پرینتەر', 'کامێرا', 'گوێژن', 'کاتژمێری زیرەک', 'جی پی ئێس', 'باتری', 'چارجەر', 'سۆفتوێر', 'وێبسایت', 'سۆشیاڵ میدیا', 'پەیوەندی ڤیدیۆیی', 'وشەی نهێنی', 'هەڵگرتنی کڵاود', 'ئەقڵی دەستکرد', 'کیبۆرد']
            }
        },
        music: {
            icon: 'music',
            color: '#ef4444',
            words: {
                en: ['Guitar', 'Piano', 'Drums', 'Violin', 'Microphone', 'Concert', 'Album', 'DJ', 'Karaoke', 'Choir', 'Orchestra', 'Headphones', 'Record Player', 'Amplifier', 'Bass', 'Flute', 'Saxophone', 'Harp', 'Tambourine', 'Hip Hop', 'Jazz', 'Rock', 'Classical', 'Country', 'Pop Music'],
                ku: ['گیتار', 'پیانۆ', 'درەم', 'کەمانچە', 'مایکرۆفۆن', 'کۆنسێرت', 'ئەلبوم', 'دی جەی', 'کاراۆکە', 'کۆڕ', 'ئۆرکیستر', 'گوێژن', 'گرامۆفۆن', 'ئامپلیفایەر', 'بەیس', 'فلووت', 'ساکسۆفۆن', 'هارپ', 'دەف', 'هیپ هۆپ', 'جاز', 'ڕۆک', 'کلاسیکی', 'کۆنتری', 'پۆپ']
            }
        },
        travel: {
            icon: 'travel',
            color: '#14b8a6',
            words: {
                en: ['Passport', 'Suitcase', 'Airplane', 'Hotel Room', 'Beach Resort', 'Map', 'Compass', 'Tourist', 'Souvenir', 'Cruise Ship', 'Camping', 'Backpacking', 'Road Trip', 'Visa', 'Boarding Pass', 'Taxi', 'Luggage', 'Sunset View', 'Mountain Trail', 'City Tour', 'Travel Guide', 'Currency Exchange', 'First Class', 'Duty Free', 'Jet Lag'],
                ku: ['پاسپۆرت', 'چەمدان', 'فڕۆکە', 'ژووری هوتێل', 'شوێنی کەناری', 'نەخشە', 'قیبلەنما', 'گەشتیار', 'بیرەوەری', 'کەشتی گەشتیاری', 'کامپ', 'باکپاکینگ', 'گەشتی ڕێگا', 'ڤیزا', 'کارتی سوار بوون', 'تاکسی', 'بار', 'دیمەنی ئاوابوون', 'ڕێگای شاخ', 'گەشتی شار', 'ڕێنمای گەشت', 'ئاڵتوندان', 'پۆلی یەکەم', 'دیوتی فری', 'ماندووی گەشت']
            }
        },
        clothes: {
            icon: 'clothes',
            color: '#d946ef',
            words: {
                en: ['T-Shirt', 'Jeans', 'Dress', 'Sneakers', 'Sunglasses', 'Watch', 'Jacket', 'Scarf', 'Hat', 'Gloves', 'Suit', 'Hoodie', 'Shorts', 'Skirt', 'Boots', 'Sandals', 'Belt', 'Tie', 'Socks', 'Pajamas', 'Swimsuit', 'Raincoat', 'Uniform', 'Vest', 'Necklace'],
                ku: ['تی شێرت', 'جینز', 'جلی ژنانە', 'سنیکەر', 'چاوێلکەی خۆر', 'کاتژمێر', 'چاکەت', 'لەچک', 'کڵاو', 'دەستکێش', 'قات و بەرگ', 'هوودی', 'شۆرت', 'تەنوورە', 'پوتین', 'سەنداڵ', 'قایش', 'کرافات', 'گۆرەوی', 'جلی خەو', 'جلی مەلە', 'بارانی', 'یوونیفۆرم', 'ڤێست', 'گەردنبەند']
            }
        },
        nature: {
            icon: 'nature',
            color: '#22c55e',
            words: {
                en: ['Volcano', 'Waterfall', 'Forest', 'Desert', 'Ocean', 'Mountain', 'River', 'Lake', 'Island', 'Cave', 'Rainbow', 'Sunset', 'Thunder', 'Snow', 'Earthquake', 'Moon', 'Stars', 'Glacier', 'Coral Reef', 'Jungle', 'Canyon', 'Valley', 'Hot Spring', 'Tornado', 'Aurora'],
                ku: ['ئاگربڕکێ', 'ئاوشار', 'دارستان', 'بیابان', 'ئۆقیانووس', 'شاخ', 'ڕووبار', 'دەریاچە', 'دوورگە', 'ئەشکەوت', 'کەوان', 'ئاوابوون', 'هەورەتریشقە', 'بەفر', 'بومەلەرزە', 'مانگ', 'ئەستێرەکان', 'سەهۆڵ', 'پاڵاوگەی مرجان', 'جەنگەڵ', 'دەرە', 'دۆڵ', 'کانیاوی گەرم', 'تۆرنادۆ', 'شەفەق']
            }
        },
        kitchen: {
            icon: 'kitchen',
            color: '#fb923c',
            words: {
                en: ['Oven', 'Fridge', 'Blender', 'Toaster', 'Microwave', 'Knife', 'Fork', 'Spoon', 'Plate', 'Bowl', 'Cup', 'Pan', 'Pot', 'Cutting Board', 'Apron', 'Recipe', 'Spatula', 'Whisk', 'Rolling Pin', 'Colander', 'Measuring Cup', 'Grill', 'Dishwasher', 'Napkin', 'Salt Shaker'],
                ku: ['تەنوور', 'سەردکەرەوە', 'بلێندەر', 'تۆستەر', 'مایکرۆوەیڤ', 'چەقۆ', 'چەنگاڵ', 'کەوچک', 'دەوری', 'قاپی قوڵ', 'کوپ', 'تاوە', 'مەنجەڵ', 'تەختەی بڕین', 'بێزگر', 'ڕێچەتە', 'سپاتولا', 'ویسک', 'تەوەڕە', 'سافی', 'پێوانەی کوپ', 'گریل', 'قاپشۆر', 'دەسپاک', 'خوێدان']
            }
        },
        celebration: {
            icon: 'celebration',
            color: '#fbbf24',
            words: {
                en: ['Birthday', 'Wedding', 'New Year', 'Graduation', 'Baby Shower', 'Anniversary', 'Surprise Party', 'Fireworks', 'Gift', 'Balloon', 'Candle', 'Invitation', 'Dance', 'Feast', 'Costume Party', 'Carnival', 'Festival', 'Parade', 'Reunion', 'Farewell', 'Toast', 'Decoration', 'Banquet', 'Photo Booth', 'Confetti'],
                ku: ['ڕۆژی لەدایکبوون', 'هاوسەرگیری', 'ساڵی نوێ', 'دەرچوون', 'ئاهەنگی منداڵ', 'ساڵیادی هاوسەرگیری', 'ئاهەنگی سەرسوڕمان', 'یاری ئاگرین', 'دیاری', 'فوقە', 'مۆم', 'بانگهێشتنامە', 'سەما', 'خوان', 'ئاهەنگی جل', 'کارنیڤال', 'فێستیڤاڵ', 'پەیڕەو', 'هاوبینینەوە', 'خواحافیزی', 'تۆست', 'ڕازاندنەوە', 'خوانی گەورە', 'شوێنی وێنە', 'کانفێتی']
            }
        }
    };

    function getCategories() {
        return Object.keys(categories).map(key => ({
            id: key,
            icon: categories[key].icon,
            color: categories[key].color,
            nameKey: `cat_${key}`
        }));
    }

    function getRandomWord(categoryId, lang) {
        const cat = categories[categoryId];
        if (!cat) return null;
        const words = cat.words[lang] || cat.words['en'];
        return words[Math.floor(Math.random() * words.length)];
    }

    function getRandomWordFromMultiple(categoryIds, lang) {
        if (!categoryIds || categoryIds.length === 0) {
            categoryIds = Object.keys(categories);
        }
        const catId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
        return {
            word: getRandomWord(catId, lang),
            category: catId
        };
    }

    function getCategoryWordCount(categoryId) {
        const cat = categories[categoryId];
        return cat ? cat.words.en.length : 0;
    }

    return { getCategories, getRandomWord, getRandomWordFromMultiple, getCategoryWordCount };
})();
