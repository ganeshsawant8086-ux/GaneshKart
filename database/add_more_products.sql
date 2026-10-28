



USE GaneshKartDB;
GO

-- 1. Apple iPhone 16 Pro
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Apple iPhone 16 Pro (Desert Titanium, 256 GB)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Apple iPhone 16 Pro (Desert Titanium, 256 GB)', 
            'Grade 5 titanium design with thinner borders, A18 Pro chip, 48MP Fusion camera with Camera Control, and 4K 120 fps Dolby Vision.', 
            139900.00, 134900.00, 'Mobiles', 'Apple', 
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80', 
            4.9, 20);
END

-- 2. Google Pixel 8 Pro
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Google Pixel 8 Pro (Bay Blue, 128 GB)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Google Pixel 8 Pro (Bay Blue, 128 GB)', 
            'Google Tensor G3 chip, best-in-class camera system with generative AI editing, Super Actua display, and 7 years of software updates.', 
            106999.00, 84999.00, 'Mobiles', 'Google', 
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 
            4.6, 30);
END

-- 3. OnePlus Open Foldable
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'OnePlus Open Foldable 5G (Emerald Dusk, 16GB, 512GB)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('OnePlus Open Foldable 5G (Emerald Dusk, 16GB, 512GB)', 
            'Groundbreaking ultra-thin foldable design, Sony LYT-T808 Pixel Stacked sensor, Hasselblad portrait camera, and Open Canvas multitasking.', 
            149999.00, 139999.00, 'Mobiles', 'OnePlus', 
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80', 
            4.7, 15);
END

-- 4. Apple Watch Ultra 2
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium)', 
            'The most rugged and capable Apple Watch. 3000-nit Always-On Retina display, S9 SiP, precision dual-frequency GPS, and up to 72 hours battery life.', 
            89900.00, 84900.00, 'Electronics', 'Apple', 
            'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', 
            4.9, 25);
END

-- 5. Sony PlayStation 5 Slim
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Sony PlayStation 5 Slim Console (1TB SSD, DualSense Controller)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Sony PlayStation 5 Slim Console (1TB SSD, DualSense Controller)', 
            'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.', 
            54990.00, 49990.00, 'Electronics', 'Sony', 
            'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80', 
            4.9, 35);
END

-- 6. Marshall Stanmore III Speaker
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Marshall Stanmore III Bluetooth Home Wireless Speaker (Black)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Marshall Stanmore III Bluetooth Home Wireless Speaker (Black)', 
            'Re-engineered for a wider soundstage, delivering room-filling signature Marshall sound. Dynamic Loudness adjusts tonal balance.', 
            37999.00, 31999.00, 'Electronics', 'Marshall', 
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80', 
            4.8, 40);
END

-- 7. Dyson V12 Vacuum Cleaner
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner', 
            'Laser illumination reveals invisible dust, piezo sensor calculates particle size and count, automatically adapting suction power.', 
            55900.00, 44900.00, 'Appliances', 'Dyson', 
            'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80', 
            4.7, 18);
END

-- 8. DeLonghi Dedica Espresso Machine
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'DeLonghi Dedica Deluxe Pump Espresso Coffee Machine')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('DeLonghi Dedica Deluxe Pump Espresso Coffee Machine', 
            '15-bar professional pressure creates rich crema, adjustable milk frother for creamy lattes and cappuccinos, ultra-compact 6-inch design.', 
            24999.00, 18999.00, 'Appliances', 'DeLonghi', 
            'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=800&q=80', 
            4.6, 22);
END

-- 9. Havells Meditate Air Purifier
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Havells Meditate Air Purifier with UV Tech & HEPA Filter')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Havells Meditate Air Purifier with UV Tech & HEPA Filter', 
            'Advanced TiO2 module eliminates pathogenic microbes, 6-stage purification with True HEPA 14, real-time AQI digital display.', 
            26990.00, 16990.00, 'Appliances', 'Havells', 
            'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80', 
            4.5, 30);
END

-- 10. Nike Air Jordan 1 Retro
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Nike Air Jordan 1 Retro High OG Basketball Sneakers')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Nike Air Jordan 1 Retro High OG Basketball Sneakers', 
            'Iconic high-top silhouette in genuine full-grain leather, encapsulated Air-Sole unit for lightweight cushioning, and solid rubber traction.', 
            16995.00, 13995.00, 'Fashion', 'Nike', 
            'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80', 
            4.8, 28);
END

-- 11. Ray-Ban Classic Aviator
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Ray-Ban Classic Aviator Polarized Sunglasses (Gold / Green)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Ray-Ban Classic Aviator Polarized Sunglasses (Gold / Green)', 
            'Timeless tear-drop aviator shape originally created for US aviators in 1937. 100% UV400 protection with glare-blocking polarized crystal lenses.', 
            11590.00, 9290.00, 'Fashion', 'Ray-Ban', 
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80', 
            4.7, 55);
END

-- 12. Fossil Grant Chronograph Watch
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Fossil Grant Chronograph Dark Brown Leather Watch')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Fossil Grant Chronograph Dark Brown Leather Watch', 
            'Inspired by vintage clocks, Roman numeral markers, stopwatch functionality, and interchangeable genuine supple calfskin leather strap.', 
            13495.00, 8095.00, 'Fashion', 'Fossil', 
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', 
            4.6, 45);
END

-- 13. Le Creuset Dutch Oven
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Le Creuset Enameled Cast Iron Dutch Oven (5.5 Qt, Cerise)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Le Creuset Enameled Cast Iron Dutch Oven (5.5 Qt, Cerise)', 
            'Handcrafted in France since 1925. Superior heat distribution and retention, durable easy-to-clean vibrant enamel, oven safe up to 260°C.', 
            36500.00, 28990.00, 'Home & Kitchen', 'Le Creuset', 
            'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80', 
            4.9, 14);
END

-- 14. Philips Hue Starter Kit
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Philips Hue Smart Bridge & Color Ambiance Starter Kit')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Philips Hue Smart Bridge & Color Ambiance Starter Kit', 
            '16 million colors and 50,000 shades of warm-to-cool white light. Sync with movies, music, and gaming via Alexa, Siri, or Google Assistant.', 
            14999.00, 10499.00, 'Home & Kitchen', 'Philips', 
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', 
            4.6, 35);
END

-- 15. SleepyCat Orthopedic Mattress
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'SleepyCat Original 3-Layer Orthopedic Medium-Firm Mattress (King)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('SleepyCat Original 3-Layer Orthopedic Medium-Firm Mattress (King)', 
            'Open-cell memory foam with bamboo fabric zipper cover, zero partner disturbance, tailored orthopedic spine alignment support.', 
            21899.00, 15999.00, 'Home & Kitchen', 'SleepyCat', 
            'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80', 
            4.7, 22);
END

-- 16. Ferrero Rocher Chocolates
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Ferrero Rocher Premium Hazelnut Chocolates (Pack of 24 Pieces)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Ferrero Rocher Premium Hazelnut Chocolates (Pack of 24 Pieces)', 
            'Whole crunchy hazelnut in the heart, creamy hazelnut filling, crisp wafer shell covered with milk chocolate and gently roasted pieces.', 
            995.00, 799.00, 'Grocery', 'Ferrero Rocher', 
            'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80', 
            4.9, 120);
END

-- 17. Starbucks Pike Place Roast Coffee
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Starbucks Pike Place Roast Whole Bean Coffee (100% Arabica, 340g)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Starbucks Pike Place Roast Whole Bean Coffee (100% Arabica, 340g)', 
            'Well-rounded with subtle notes of cocoa and toasted nuts balancing the smooth mouthfeel. Roasted to perfection in medium roast profile.', 
            1250.00, 999.00, 'Grocery', 'Starbucks', 
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', 
            4.8, 85);
END

-- 18. Happilo Almonds & Cashews Jumbo Combo
IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Name = 'Happilo 100% Natural California Almonds & Cashews Combo (1 Kg)')
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES ('Happilo 100% Natural California Almonds & Cashews Combo (1 Kg)', 
            'Handpicked premium grade crunchy California almonds and king-sized whole cashews, zero cholesterol, rich in plant protein and dietary fiber.', 
            1699.00, 1149.00, 'Grocery', 'Happilo', 
            'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80', 
            4.7, 160);
END
GO

