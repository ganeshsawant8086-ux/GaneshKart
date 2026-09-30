-- GaneshKart Seed Data
USE GaneshKartDB;
GO

-- 1. Insert Categories
IF NOT EXISTS (SELECT 1 FROM dbo.Categories)
BEGIN
    INSERT INTO dbo.Categories (Name, Icon, Description, IsActive) VALUES
    ('Electronics', 'Laptop', 'Laptops, Audio, Cameras & Accessories', 1),
    ('Mobiles', 'Smartphone', 'Smartphones, Tablets & Mobile Accessories', 1),
    ('Fashion', 'Shirt', 'Men, Women & Kids Clothing & Footwear', 1),
    ('Grocery', 'ShoppingBag', 'Daily Essentials, Staples & Snacks', 1),
    ('Home & Kitchen', 'Home', 'Cookware, Furniture & Home Decor', 1),
    ('Appliances', 'Tv', 'Smart TVs, Refrigerators & Washing Machines', 1);
END
GO

-- 2. Insert Demo User
IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com')
BEGIN
    INSERT INTO dbo.Users (FullName, Email, PhoneNumber, PasswordHash, Role)
    VALUES ('Ganesh Sharma', 'ganesh@ganeshkart.com', '9876543210', 'DummyHashedPassword123!', 'Customer');
END
GO

-- 3. Insert Demo Addresses for Ganesh Sharma
DECLARE @UserId INT = (SELECT TOP 1 Id FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com');

IF @UserId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.Addresses WHERE UserId = @UserId)
BEGIN
    INSERT INTO dbo.Addresses (UserId, FullName, MobileNumber, Pincode, AddressLine, City, State, Landmark, AddressType, IsDefault)
    VALUES 
    (@UserId, 'Ganesh Sharma', '9876543210', '400001', 'Flat 402, Shree Ganesh Heights, MG Road', 'Mumbai', 'Maharashtra', 'Near Chhatrapati Shivaji Terminus', 'Home', 1),
    (@UserId, 'Ganesh Sharma', '9876543210', '560001', 'Tech Park Tower 3, 5th Floor, Outer Ring Road', 'Bengaluru', 'Karnataka', 'Opposite EcoSpace', 'Work', 0);
END
GO

-- 4. Initialize Cart for Demo User
DECLARE @CartUserId INT = (SELECT TOP 1 Id FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com');
IF @CartUserId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.Cart WHERE UserId = @CartUserId)
BEGIN
    INSERT INTO dbo.Cart (UserId) VALUES (@CartUserId);
END
GO

-- 5. Insert Rich Dummy Products
IF NOT EXISTS (SELECT 1 FROM dbo.Products)
BEGIN
    INSERT INTO dbo.Products (Name, Description, Price, DiscountPrice, Category, Brand, ImageUrl, Rating, Stock)
    VALUES
    -- MOBILES
    ('Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)', 
     'Experience the next generation with Galaxy AI, Snapdragon 8 Gen 3, Quad Telephoto Camera 200MP, and Titanium Frame with built-in S-Pen.', 
     134999.00, 119999.00, 'Mobiles', 'Samsung', 
     'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', 
     4.8, 25),

    ('iPhone 15 Pro Max (Natural Titanium, 256 GB)', 
     'Forged in titanium, featuring the groundbreaking A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.', 
     159900.00, 148900.00, 'Mobiles', 'Apple', 
     'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80', 
     4.9, 30),

    ('OnePlus 12 5G (Flowy Emerald, 16GB RAM, 512GB)', 
     'Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera for Mobile, 5400 mAh Battery with 100W SUPERVOOC charging.', 
     69999.00, 64999.00, 'Mobiles', 'OnePlus', 
     'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 
     4.6, 40),

    ('Redmi Note 13 Pro+ 5G (Fusion Purple, 8GB, 256GB)', 
     'Super clear 200MP OIS camera, 1.5K 120Hz Curved AMOLED display, 120W HyperCharge, IP68 water & dust resistance.', 
     33999.00, 27999.00, 'Mobiles', 'Xiaomi', 
     'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', 
     4.4, 50),

    -- ELECTRONICS
    ('MacBook Air M3 Chip (13.6-inch, 16GB Unified RAM, 512GB SSD)', 
     'Lean, mean, M3 machine. Liquid Retina display, up to 18 hours of battery life, 1080p FaceTime HD camera, silent fanless design.', 
     134900.00, 124900.00, 'Electronics', 'Apple', 
     'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', 
     4.9, 15),

    ('Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones', 
     'Industry-leading noise cancellation with two processors and 8 microphones, exceptional sound quality with LDAC, 30 hours battery life.', 
     34990.00, 26990.00, 'Electronics', 'Sony', 
     'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 
     4.7, 45),

    ('boAt Nirvana Ion ANC True Wireless Earbuds with 120H Playtime', 
     'Active Noise Cancellation up to 32dB, Quad Mics with ENx technology, Dual EQ Modes, Beast Mode for 60ms low latency gaming.', 
     7990.00, 2499.00, 'Electronics', 'boAt', 
     'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', 
     4.3, 100),

    ('Dell Inspiron 15 Core i5 13th Gen (16GB DDR5, 512GB SSD, FHD 120Hz)', 
     'Designed for daily productivity with Intel Core i5-1335U processor, anti-glare display, Windows 11 Home & MS Office 2021.', 
     68990.00, 52990.00, 'Electronics', 'Dell', 
     'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80', 
     4.4, 20),

    -- APPLIANCES
    ('LG 55-inch 4K Ultra HD Smart OLED TV (WebOS, Dolby Atmos)', 
     'Self-lit OLED pixels for infinite contrast, α9 AI Processor Gen6 4K, 120Hz refresh rate, Dolby Vision IQ and Dolby Atmos.', 
     169990.00, 114990.00, 'Appliances', 'LG', 
     'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80', 
     4.8, 12),

    ('Samsung 253 L 3 Star Inverter Frost-Free Double Door Refrigerator', 
     'Digital Inverter Technology for 50% energy savings, Moist Fresh Zone to keep vegetables fresh, toughened glass shelves.', 
     31990.00, 24490.00, 'Appliances', 'Samsung', 
     'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80', 
     4.5, 18),

    ('IFB 7 Kg 5 Star Fully Automatic Front Load Washing Machine', 
     'Steam wash with 99.99% germ elimination, 2X Power Steam, 3D Wash system, Inbuilt heater for hygienic hot water cycle.', 
     38990.00, 31490.00, 'Appliances', 'IFB', 
     'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80', 
     4.4, 15),

    ('Philips 4.1L Digital Air Fryer with Rapid Air Technology', 
     'Fry with up to 90% less fat. 12-in-1 cooking functions including bake, grill, roast and reheat. Touch screen with 7 presets.', 
     11995.00, 7999.00, 'Appliances', 'Philips', 
     'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80', 
     4.6, 60),

    -- FASHION
    ('FabIndia Men Pure Silk Blend Kurta & Churidar Set (Maroon)', 
     'Intricately woven festive ethnic wear kurta set with mandarin collar and side slits, tailored in breathable premium silk blend.', 
     5999.00, 3499.00, 'Fashion', 'FabIndia', 
     'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80', 
     4.5, 35),

    ('Kanjivaram Soft Silk Saree with Zari Woven Border (Royal Blue)', 
     'Authentic South Indian festive pure soft lichi silk saree featuring woven rich pallu and matching unstitched blouse piece.', 
     8999.00, 2799.00, 'Fashion', 'Viramani', 
     'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', 
     4.7, 45),

    ('Titan Karishma Analog Watch for Men (Champagne Dial)', 
     'Classic gold-tone stainless steel strap, water resistant to 30 meters, scratch-resistant mineral glass with 2-year warranty.', 
     3995.00, 2795.00, 'Fashion', 'Titan', 
     'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80', 
     4.6, 80),

    ('Puma Unisex RS-X Softstyle Running & Lifestyle Sneakers', 
     'Chunky retro silhouette with lightweight PU midsole, mesh upper with suede overlays, and superior grip rubber outsole.', 
     8999.00, 4499.00, 'Fashion', 'Puma', 
     'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', 
     4.4, 50),

    -- HOME & KITCHEN
    ('Prestige Deluxe Alpha Stainless Steel Pressure Cooker 5 Litre', 
     'Alpha base for induction and gas cooktops, durable stainless steel body, precision weight valve, and controlled gasket release system.', 
     3250.00, 2299.00, 'Home & Kitchen', 'Prestige', 
     'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80', 
     4.6, 75),

    ('Solimo 100% Cotton 300 TC Double Bedsheet with 2 Pillow Covers', 
     'Breathable pure combed cotton with satin weave, skin-friendly colors, fits king mattresses up to 10 inches thick.', 
     2199.00, 999.00, 'Home & Kitchen', 'Solimo', 
     'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80', 
     4.3, 90),

    ('Milton Thermosteel Flip Lid Insulated Flask (1000 ml)', 
     'Double-walled vacuum insulated bottle keeps beverages hot or cold for 24 hours, 100% rust-proof 304 food-grade stainless steel.', 
     1299.00, 899.00, 'Home & Kitchen', 'Milton', 
     'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80', 
     4.7, 120),

    ('Wakefit Orthopedic Memory Foam Mattress (Queen, 78x60x6 inch)', 
     'Next-gen high resiliency memory foam adapts to body shape, spinal alignment support, breathable removable zipper cover.', 
     16999.00, 11899.00, 'Home & Kitchen', 'Wakefit', 
     'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80', 
     4.7, 20),

    -- GROCERY
    ('Tata Tea Gold Premium Assam & Long Leaf Tea (1 Kg Pack)', 
     'A gentle blend of fine Assam teas with gently rolled long leaves to deliver an irresistible aroma and rich taste.', 
     650.00, 520.00, 'Grocery', 'Tata Tea', 
     'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', 
     4.8, 150),

    ('Fortune Sunlite Refined Sunflower Oil Pouch (1 Litre, Pack of 3)', 
     'Light and healthy cooking oil rich in Vitamin E, low absorption technology for delicious non-sticky everyday meals.', 
     450.00, 375.00, 'Grocery', 'Fortune', 
     'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80', 
     4.5, 200),

    ('India Gate Basmati Rice Classic (5 Kg Pack)', 
     'Aged exotic basmati rice with slender, extra-long grains and captivating aroma, perfect for royal biryanis and pulao.', 
     1150.00, 899.00, 'Grocery', 'India Gate', 
     'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', 
     4.7, 110),

    ('Cadbury Celebrations Rich Dry Fruit Assorted Gift Box (450g)', 
     'Special festive collection with chocolate-covered almonds, cashews, and raisins, packaged in an elegant gift box.', 
     850.00, 699.00, 'Grocery', 'Cadbury', 
     'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80', 
     4.6, 90);
END
GO

-- 6. Insert Initial Cart Item for Demo User to showcase active cart
DECLARE @DemoCartId INT = (SELECT TOP 1 Id FROM dbo.Cart WHERE UserId = (SELECT TOP 1 Id FROM dbo.Users WHERE Email = 'ganesh@ganeshkart.com'));
DECLARE @SampleProd1 INT = (SELECT TOP 1 Id FROM dbo.Products WHERE Name LIKE '%Sony WH-1000XM5%');
DECLARE @SampleProd2 INT = (SELECT TOP 1 Id FROM dbo.Products WHERE Name LIKE '%Tata Tea Gold%');

IF @DemoCartId IS NOT NULL AND @SampleProd1 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.CartItems WHERE CartId = @DemoCartId)
BEGIN
    INSERT INTO dbo.CartItems (CartId, ProductId, Quantity) VALUES (@DemoCartId, @SampleProd1, 1);
    IF @SampleProd2 IS NOT NULL
    BEGIN
        INSERT INTO dbo.CartItems (CartId, ProductId, Quantity) VALUES (@DemoCartId, @SampleProd2, 2);
    END
END
GO
