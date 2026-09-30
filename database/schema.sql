-- GaneshKart Database Schema
-- SQL Server 2022+ / SQLEXPRESS
-- Database: GaneshKartDB

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'GaneshKartDB')
BEGIN
    CREATE DATABASE GaneshKartDB;
END
GO

USE GaneshKartDB;
GO

-- 1. Categories Table
IF OBJECT_ID('dbo.Categories', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Categories (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL UNIQUE,
        Icon NVARCHAR(100) NULL,
        Description NVARCHAR(500) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedDate DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END
GO

-- 2. Products Table
IF OBJECT_ID('dbo.Products', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Products (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(250) NOT NULL,
        Description NVARCHAR(MAX) NOT NULL,
        Price DECIMAL(18,2) NOT NULL,
        DiscountPrice DECIMAL(18,2) NOT NULL,
        Category NVARCHAR(100) NOT NULL,
        Brand NVARCHAR(100) NOT NULL,
        ImageUrl NVARCHAR(1000) NOT NULL,
        Rating DECIMAL(3,2) NOT NULL DEFAULT 4.0,
        Stock INT NOT NULL DEFAULT 10,
        CreatedDate DATETIME2 NOT NULL DEFAULT GETDATE()
    );
    CREATE INDEX IX_Products_Category ON dbo.Products(Category);
    CREATE INDEX IX_Products_Brand ON dbo.Products(Brand);
END
GO

-- 3. Users Table
IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(150) NOT NULL,
        Email NVARCHAR(200) NOT NULL UNIQUE,
        PhoneNumber NVARCHAR(20) NOT NULL,
        PasswordHash NVARCHAR(500) NOT NULL,
        Role NVARCHAR(50) NOT NULL DEFAULT 'Customer',
        CreatedDate DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END
GO

-- 4. Addresses Table
IF OBJECT_ID('dbo.Addresses', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Addresses (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        FullName NVARCHAR(150) NOT NULL,
        MobileNumber NVARCHAR(20) NOT NULL,
        Pincode NVARCHAR(10) NOT NULL,
        AddressLine NVARCHAR(300) NOT NULL,
        City NVARCHAR(100) NOT NULL,
        State NVARCHAR(100) NOT NULL,
        Landmark NVARCHAR(200) NULL,
        AddressType NVARCHAR(20) NOT NULL DEFAULT 'Home', -- 'Home', 'Work'
        IsDefault BIT NOT NULL DEFAULT 0,
        CreatedDate DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_Addresses_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
    );
END
GO

-- 5. Cart Table
IF OBJECT_ID('dbo.Cart', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Cart (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL UNIQUE,
        CreatedDate DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_Cart_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
    );
END
GO

-- 6. CartItems Table
IF OBJECT_ID('dbo.CartItems', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CartItems (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        CartId INT NOT NULL,
        ProductId INT NOT NULL,
        Quantity INT NOT NULL DEFAULT 1,
        AddedDate DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_CartItems_Cart FOREIGN KEY (CartId) REFERENCES dbo.Cart(Id) ON DELETE CASCADE,
        CONSTRAINT FK_CartItems_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IX_CartItems_Cart_Product ON dbo.CartItems(CartId, ProductId);
END
GO

-- 7. Orders Table
IF OBJECT_ID('dbo.Orders', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Orders (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        OrderDate DATETIME2 NOT NULL DEFAULT GETDATE(),
        TotalAmount DECIMAL(18,2) NOT NULL,
        DiscountAmount DECIMAL(18,2) NOT NULL DEFAULT 0,
        DeliveryCharge DECIMAL(18,2) NOT NULL DEFAULT 0,
        FinalAmount DECIMAL(18,2) NOT NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Order Placed', -- 'Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'
        ShippingAddress NVARCHAR(500) NOT NULL,
        PhoneNumber NVARCHAR(20) NOT NULL,
        CustomerName NVARCHAR(150) NOT NULL,
        PaymentMethod NVARCHAR(50) NOT NULL DEFAULT 'Cash on Delivery',
        PaymentStatus NVARCHAR(50) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Completed', 'Failed'
        CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
    );
END
GO

-- 8. OrderItems Table
IF OBJECT_ID('dbo.OrderItems', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.OrderItems (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        OrderId INT NOT NULL,
        ProductId INT NOT NULL,
        ProductName NVARCHAR(250) NOT NULL,
        ProductImageUrl NVARCHAR(1000) NOT NULL,
        UnitPrice DECIMAL(18,2) NOT NULL,
        Quantity INT NOT NULL,
        TotalPrice DECIMAL(18,2) NOT NULL,
        CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES dbo.Orders(Id) ON DELETE CASCADE
    );
END
GO

-- 9. Payments Table
IF OBJECT_ID('dbo.Payments', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Payments (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        OrderId INT NOT NULL,
        TransactionId NVARCHAR(100) NOT NULL UNIQUE,
        PaymentMethod NVARCHAR(50) NOT NULL,
        Amount DECIMAL(18,2) NOT NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Success',
        PaymentDate DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_Payments_Orders FOREIGN KEY (OrderId) REFERENCES dbo.Orders(Id) ON DELETE CASCADE
    );
END
GO

-- 10. Wishlist Table
IF OBJECT_ID('dbo.Wishlist', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Wishlist (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        ProductId INT NOT NULL,
        AddedDate DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_Wishlist_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_Wishlist_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IX_Wishlist_User_Product ON dbo.Wishlist(UserId, ProductId);
END
GO
