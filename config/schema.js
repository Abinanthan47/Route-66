import { integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: integer("year").notNull(),
  driveType: varchar("driveType").notNull(),
  transmission: varchar("transmission").notNull(),
  fuelType: varchar("fuelType").notNull(),
  mileage: integer("mileage").notNull(),
  engineSize: varchar("engineSize"),
  cylinder: integer("cylinder"),
  color: varchar("color").notNull(),
  door: integer("door").notNull(),
  vin: varchar("vin"),
  offerType: varchar("offerType"),
  listingDescription: text("listingDescription").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy").notNull(),
  userName:varchar('userName').notNull().default('Count Kustoms'),
  userImageUrl:varchar('userImageUrl').default('https://i.pinimg.com/736x/b4/0c/ff/b40cff822671bdc502cf500cecb87c35.jpg'),
  postedOn: varchar("postedOn"),

});

export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId")
    .notNull()
    .references(() => CarListing.id),
});
