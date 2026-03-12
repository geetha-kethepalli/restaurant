// ============================================
// sampleData.js
// Static data: categories, servers, cuisine
// images, sample menus, and menu helpers.
// ============================================

// ============================================
// CATEGORIES
// ============================================
export const CATEGORIES = [
  { label: "All Restaurants", value: "" },
  { label: "Indian", value: "indian" },
  { label: "Italian", value: "italian" },
  { label: "Chinese", value: "chinese" },
  { label: "Burger", value: "burger" },
  { label: "Desserts", value: "dessert" },
  { label: "Cafes", value: "coffee" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Pizza", value: "pizza" },
];

// ============================================
// OVERPASS SERVERS
// ============================================
export const OVERPASS_SERVERS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.ru/api/interpreter",
];

// ============================================
// CUISINE IMAGES
// ============================================
export const CUISINE_IMAGES = {
  indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=160&fit=crop",
  italian: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=160&fit=crop",
  chinese: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=160&fit=crop",
  burger: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=160&fit=crop",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=160&fit=crop",
  dessert: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=160&fit=crop",
  coffee: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=160&fit=crop",
  vegetarian: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=160&fit=crop",
  japanese: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=160&fit=crop",
  mexican: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=160&fit=crop",
  thai: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=300&h=160&fit=crop",
  seafood: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=160&fit=crop",
  taiwanese: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=160&fit=crop",
  french: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=160&fit=crop",
  american: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=160&fit=crop",
  default: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=160&fit=crop",
};

export const getFoodImage = (cuisine) => {
  const cuisineLower = cuisine?.toLowerCase() || "";
  for (let key of Object.keys(CUISINE_IMAGES)) {
    if (cuisineLower.includes(key)) {
      return CUISINE_IMAGES[key];
    }
  }
  return CUISINE_IMAGES.default;
};
// CUISINE SPECIFIC SAMPLE MENUS - INR
// ============================================
export const SAMPLE_MENUS = {

  indian: [
    {
      category: "Starters",
      items: [
        { name: "Samosa (2 pcs)", price: "Rs.80", desc: "Crispy pastry filled with spiced potatoes" },
        { name: "Onion Bhaji", price: "Rs.120", desc: "Golden fried onion fritters with spices" },
        { name: "Chicken Tikka", price: "Rs.280", desc: "Tender marinated chicken pieces grilled" },
        { name: "Paneer Tikka", price: "Rs.250", desc: "Spiced cottage cheese grilled in tandoor" },
      ],
    },
    {
      category: "Main Course",
      items: [
        { name: "Butter Chicken", price: "Rs.320", desc: "Creamy tomato based chicken curry" },
        { name: "Lamb Biryani", price: "Rs.380", desc: "Fragrant basmati rice with spiced lamb" },
        { name: "Palak Paneer", price: "Rs.280", desc: "Cottage cheese in creamy spinach gravy" },
        { name: "Dal Makhani", price: "Rs.220", desc: "Slow cooked black lentils in butter sauce" },
        { name: "Chicken Chettinad", price: "Rs.350", desc: "Spicy South Indian chicken curry" },
        { name: "Mutton Rogan Josh", price: "Rs.420", desc: "Aromatic Kashmiri slow cooked mutton" },
      ],
    },
    {
      category: "Breads",
      items: [
        { name: "Garlic Naan", price: "Rs.60", desc: "Soft leavened bread with garlic butter" },
        { name: "Tandoori Roti", price: "Rs.40", desc: "Whole wheat bread baked in tandoor oven" },
        { name: "Paratha", price: "Rs.70", desc: "Flaky layered whole wheat flatbread" },
        { name: "Puri (4 pcs)", price: "Rs.80", desc: "Deep fried fluffy wheat bread" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Gulab Jamun (2 pcs)", price: "Rs.100", desc: "Soft milk dumplings in rose sugar syrup" },
        { name: "Mango Kulfi", price: "Rs.120", desc: "Traditional Indian ice cream with mango" },
        { name: "Rasgulla (2 pcs)", price: "Rs.90", desc: "Soft spongy cottage cheese balls in syrup" },
        { name: "Gajar Ka Halwa", price: "Rs.150", desc: "Slow cooked carrot dessert with dry fruits" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Mango Lassi", price: "Rs.120", desc: "Chilled yogurt drink blended with mango" },
        { name: "Masala Chai", price: "Rs.60", desc: "Spiced Indian tea with milk" },
        { name: "Fresh Lime Soda", price: "Rs.80", desc: "Refreshing lime with soda sweet or salted" },
      ],
    },
  ],

  italian: [
    {
      category: "Antipasti",
      items: [
        { name: "Bruschetta", price: "Rs.220", desc: "Grilled bread with tomatoes and basil" },
        { name: "Caprese Salad", price: "Rs.280", desc: "Fresh mozzarella with tomatoes and basil" },
        { name: "Arancini (3 pcs)", price: "Rs.260", desc: "Crispy fried risotto balls with cheese" },
        { name: "Garlic Bread", price: "Rs.150", desc: "Toasted bread with garlic herb butter" },
      ],
    },
    {
      category: "Pasta",
      items: [
        { name: "Spaghetti Carbonara", price: "Rs.450", desc: "Pasta with eggs pancetta and pecorino" },
        { name: "Penne Arrabiata", price: "Rs.380", desc: "Penne in spicy tomato garlic sauce" },
        { name: "Fettuccine Alfredo", price: "Rs.420", desc: "Pasta in rich creamy parmesan sauce" },
        { name: "Lasagne", price: "Rs.480", desc: "Layered pasta with meat sauce and bechamel" },
      ],
    },
    {
      category: "Pizza",
      items: [
        { name: "Margherita", price: "Rs.380", desc: "Classic tomato sauce with mozzarella" },
        { name: "Pepperoni", price: "Rs.450", desc: "Tomato sauce with pepperoni and cheese" },
        { name: "Quattro Formaggi", price: "Rs.520", desc: "Four cheese pizza with truffle oil" },
        { name: "Vegetariana", price: "Rs.400", desc: "Seasonal vegetables on tomato base" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Tiramisu", price: "Rs.280", desc: "Classic coffee mascarpone dessert" },
        { name: "Panna Cotta", price: "Rs.250", desc: "Silky vanilla cream with berry coulis" },
        { name: "Gelato (2 scoops)", price: "Rs.180", desc: "Italian ice cream in assorted flavours" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Espresso", price: "Rs.120", desc: "Strong Italian style single shot coffee" },
        { name: "Cappuccino", price: "Rs.180", desc: "Espresso with steamed milk and foam" },
        { name: "Fresh Lemonade", price: "Rs.150", desc: "Freshly squeezed lemon with mint" },
      ],
    },
  ],

  chinese: [
    {
      category: "Dim Sum",
      items: [
        { name: "Steamed Momos (6 pcs)", price: "Rs.180", desc: "Steamed dumplings with spicy dipping sauce" },
        { name: "Fried Momos (6 pcs)", price: "Rs.200", desc: "Crispy fried dumplings with red chutney" },
        { name: "Spring Rolls (3 pcs)", price: "Rs.160", desc: "Crispy rolls filled with vegetables" },
        { name: "Har Gow (4 pcs)", price: "Rs.220", desc: "Steamed shrimp dumplings in thin wrap" },
      ],
    },
    {
      category: "Main Course",
      items: [
        { name: "Kung Pao Chicken", price: "Rs.320", desc: "Spicy chicken with peanuts and peppers" },
        { name: "Chicken Chow Mein", price: "Rs.280", desc: "Stir fried noodles with chicken and veggies" },
        { name: "Veg Fried Rice", price: "Rs.220", desc: "Wok fried rice with eggs and vegetables" },
        { name: "Chicken Manchurian", price: "Rs.300", desc: "Crispy chicken in Indo Chinese sauce" },
        { name: "Sweet Sour Pork", price: "Rs.350", desc: "Crispy pork in tangy sweet sour sauce" },
      ],
    },
    {
      category: "Soups",
      items: [
        { name: "Hot Sour Soup", price: "Rs.180", desc: "Spicy tangy soup with tofu and mushrooms" },
        { name: "Sweet Corn Soup", price: "Rs.160", desc: "Creamy corn soup with vegetables" },
        { name: "Won Ton Soup", price: "Rs.200", desc: "Delicate dumplings in clear broth" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Mango Pudding", price: "Rs.150", desc: "Smooth creamy mango dessert pudding" },
        { name: "Egg Tarts (2 pcs)", price: "Rs.120", desc: "Flaky pastry with silky egg custard" },
        { name: "Fried Ice Cream", price: "Rs.180", desc: "Crispy fried shell with ice cream inside" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Green Tea", price: "Rs.100", desc: "Authentic Chinese green tea pot" },
        { name: "Lychee Juice", price: "Rs.120", desc: "Chilled fresh lychee fruit juice" },
      ],
    },
  ],

  burger: [
    {
      category: "Burgers",
      items: [
        { name: "Classic Veg Burger", price: "Rs.180", desc: "Aloo tikki patty with fresh toppings" },
        { name: "Chicken Burger", price: "Rs.250", desc: "Crispy chicken patty with lettuce sauce" },
        { name: "Paneer Burger", price: "Rs.220", desc: "Spiced paneer patty with mint chutney" },
        { name: "BBQ Bacon Burger", price: "Rs.320", desc: "Smoky bacon with BBQ sauce onion rings" },
        { name: "Double Patty Burger", price: "Rs.380", desc: "Double chicken patty with extra cheese" },
      ],
    },
    {
      category: "Sides",
      items: [
        { name: "French Fries", price: "Rs.120", desc: "Crispy golden fries with seasoning" },
        { name: "Peri Peri Fries", price: "Rs.150", desc: "Spicy peri peri seasoned fries" },
        { name: "Onion Rings", price: "Rs.140", desc: "Beer battered crispy onion rings" },
        { name: "Coleslaw", price: "Rs.80", desc: "Creamy homemade coleslaw salad" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Chocolate Milkshake", price: "Rs.180", desc: "Thick creamy chocolate milkshake" },
        { name: "Strawberry Milkshake", price: "Rs.180", desc: "Fresh strawberry blended milkshake" },
        { name: "Cold Coffee", price: "Rs.150", desc: "Chilled blended coffee with ice cream" },
        { name: "Fresh Lime Soda", price: "Rs.80", desc: "Refreshing lime with soda sweet or salted" },
      ],
    },
  ],

  pizza: [
    {
      category: "Classic Pizzas",
      items: [
        { name: "Margherita", price: "Rs.320", desc: "Tomato sauce with fresh mozzarella basil" },
        { name: "Pepperoni", price: "Rs.420", desc: "Classic pepperoni with tomato and cheese" },
        { name: "BBQ Chicken", price: "Rs.450", desc: "Smoky BBQ sauce with grilled chicken" },
        { name: "Paneer Tikka Pizza", price: "Rs.400", desc: "Indian style paneer tikka on pizza base" },
      ],
    },
    {
      category: "Gourmet Pizzas",
      items: [
        { name: "Truffle Mushroom", price: "Rs.520", desc: "Wild mushrooms with truffle oil and brie" },
        { name: "Seafood Pizza", price: "Rs.580", desc: "Prawns squid and mussels with garlic" },
        { name: "Four Cheese", price: "Rs.480", desc: "Mozzarella cheddar brie and parmesan" },
      ],
    },
    {
      category: "Sides",
      items: [
        { name: "Garlic Bread", price: "Rs.150", desc: "Toasted bread with garlic butter and herbs" },
        { name: "Caesar Salad", price: "Rs.220", desc: "Romaine lettuce with Caesar dressing" },
        { name: "Potato Wedges", price: "Rs.160", desc: "Crispy baked potato wedges with dip" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Choco Lava Cake", price: "Rs.220", desc: "Warm cake with gooey chocolate centre" },
        { name: "Tiramisu", price: "Rs.250", desc: "Classic Italian coffee mascarpone dessert" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Mocktail of the Day", price: "Rs.180", desc: "Ask server for today's special mocktail" },
        { name: "Fresh Juice", price: "Rs.120", desc: "Choice of orange mango or watermelon" },
      ],
    },
  ],

  dessert: [
    {
      category: "Indian Sweets",
      items: [
        { name: "Gulab Jamun (2 pcs)", price: "Rs.100", desc: "Soft milk dumplings in rose sugar syrup" },
        { name: "Rasgulla (2 pcs)", price: "Rs.90", desc: "Soft spongy cottage cheese balls in syrup" },
        { name: "Jalebi", price: "Rs.80", desc: "Crispy spiral sweets soaked in sugar syrup" },
        { name: "Gajar Ka Halwa", price: "Rs.150", desc: "Slow cooked carrot dessert with dry fruits" },
      ],
    },
    {
      category: "Cakes",
      items: [
        { name: "Chocolate Lava Cake", price: "Rs.220", desc: "Warm cake with gooey chocolate centre" },
        { name: "Cheesecake", price: "Rs.200", desc: "New York style with berry compote" },
        { name: "Carrot Cake", price: "Rs.180", desc: "Spiced cake with cream cheese frosting" },
      ],
    },
    {
      category: "Ice Cream",
      items: [
        { name: "Sundae", price: "Rs.180", desc: "Vanilla ice cream with hot fudge sauce" },
        { name: "Kulfi", price: "Rs.120", desc: "Traditional Indian ice cream on stick" },
        { name: "Waffle Cone (2 scoops)", price: "Rs.150", desc: "Fresh waffle cone with choice of flavour" },
      ],
    },
    {
      category: "Pastries",
      items: [
        { name: "Croissant", price: "Rs.120", desc: "Buttery flaky French pastry" },
        { name: "Eclair", price: "Rs.140", desc: "Choux pastry with cream and chocolate" },
        { name: "Muffin", price: "Rs.100", desc: "Freshly baked muffin choice of flavour" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Hot Chocolate", price: "Rs.150", desc: "Rich creamy hot chocolate with marshmallows" },
        { name: "Milkshake", price: "Rs.180", desc: "Thick creamy shake choice of flavour" },
      ],
    },
  ],

  coffee: [
    {
      category: "Hot Coffee",
      items: [
        { name: "Espresso", price: "Rs.120", desc: "Strong Italian style single shot coffee" },
        { name: "Cappuccino", price: "Rs.180", desc: "Espresso with steamed milk and foam" },
        { name: "Latte", price: "Rs.180", desc: "Smooth espresso with lots of steamed milk" },
        { name: "Flat White", price: "Rs.200", desc: "Double espresso with velvety steamed milk" },
        { name: "Filter Coffee", price: "Rs.80", desc: "Traditional South Indian filter coffee" },
      ],
    },
    {
      category: "Cold Coffee",
      items: [
        { name: "Cold Coffee", price: "Rs.180", desc: "Chilled blended coffee with ice cream" },
        { name: "Iced Latte", price: "Rs.200", desc: "Chilled espresso with cold milk over ice" },
        { name: "Cold Brew", price: "Rs.220", desc: "Slow steeped smooth cold coffee" },
        { name: "Frappuccino", price: "Rs.250", desc: "Blended iced coffee with whipped cream" },
      ],
    },
    {
      category: "Food",
      items: [
        { name: "Masala Toast", price: "Rs.120", desc: "Spiced vegetable filling on toasted bread" },
        { name: "Veg Sandwich", price: "Rs.150", desc: "Grilled sandwich with fresh vegetables" },
        { name: "Blueberry Muffin", price: "Rs.120", desc: "Freshly baked muffin with blueberries" },
        { name: "Club Sandwich", price: "Rs.250", desc: "Triple layer sandwich with chicken bacon" },
      ],
    },
    {
      category: "Other Drinks",
      items: [
        { name: "Masala Chai", price: "Rs.60", desc: "Spiced Indian tea with milk" },
        { name: "Green Tea", price: "Rs.100", desc: "Refreshing hot or cold green tea" },
        { name: "Fresh Juice", price: "Rs.120", desc: "Choice of orange mango or watermelon" },
      ],
    },
  ],

  vegetarian: [
    {
      category: "Starters",
      items: [
        { name: "Veg Soup", price: "Rs.150", desc: "Fresh seasonal vegetable soup" },
        { name: "Falafel Plate", price: "Rs.220", desc: "Crispy chickpea patties with hummus" },
        { name: "Paneer Tikka", price: "Rs.280", desc: "Spiced cottage cheese grilled in tandoor" },
        { name: "Hara Bhara Kabab", price: "Rs.220", desc: "Spinach peas and potato cutlets" },
      ],
    },
    {
      category: "Main Course",
      items: [
        { name: "Paneer Butter Masala", price: "Rs.300", desc: "Cottage cheese in rich tomato butter gravy" },
        { name: "Mushroom Risotto", price: "Rs.350", desc: "Creamy arborio rice with wild mushrooms" },
        { name: "Dal Tadka", price: "Rs.200", desc: "Yellow lentils tempered with spices" },
        { name: "Veg Biryani", price: "Rs.280", desc: "Fragrant basmati rice with mixed vegetables" },
        { name: "Chole Bhature", price: "Rs.180", desc: "Spicy chickpea curry with fried bread" },
      ],
    },
    {
      category: "Salads",
      items: [
        { name: "Greek Salad", price: "Rs.220", desc: "Feta olives cucumber and tomato" },
        { name: "Caesar Salad", price: "Rs.200", desc: "Romaine lettuce with Caesar dressing" },
        { name: "Kachumber Salad", price: "Rs.120", desc: "Fresh Indian cucumber tomato onion salad" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Vegan Brownie", price: "Rs.160", desc: "Rich chocolatey dairy free brownie" },
        { name: "Fruit Sorbet", price: "Rs.150", desc: "Refreshing natural fruit sorbet" },
        { name: "Kheer", price: "Rs.130", desc: "Creamy Indian rice pudding with cardamom" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Mango Lassi", price: "Rs.120", desc: "Chilled yogurt drink blended with mango" },
        { name: "Coconut Water", price: "Rs.80", desc: "Fresh natural coconut water" },
        { name: "Masala Chai", price: "Rs.60", desc: "Spiced Indian tea with milk" },
      ],
    },
  ],

  default: [
    {
      category: "Starters",
      items: [
        { name: "Soup of the Day", price: "Rs.150", desc: "Ask your server for today's selection" },
        { name: "Garlic Bread", price: "Rs.120", desc: "Toasted bread with garlic herb butter" },
        { name: "Mixed Salad", price: "Rs.180", desc: "Fresh garden salad with house dressing" },
      ],
    },
    {
      category: "Main Course",
      items: [
        { name: "Chef's Special", price: "Rs.450", desc: "Ask your server for today's special" },
        { name: "Grilled Chicken", price: "Rs.380", desc: "Served with seasonal vegetables and sauce" },
        { name: "Pasta of the Day", price: "Rs.320", desc: "Fresh pasta with house made sauce" },
        { name: "Veggie Option", price: "Rs.280", desc: "Ask server for vegetarian selection" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Ice Cream (2 scoops)", price: "Rs.150", desc: "Choice of vanilla chocolate or strawberry" },
        { name: "Brownie", price: "Rs.180", desc: "Warm chocolate brownie with cream" },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Fresh Lime Soda", price: "Rs.80", desc: "Refreshing lime with soda sweet or salted" },
        { name: "Masala Chai", price: "Rs.60", desc: "Spiced Indian tea with milk" },
        { name: "Fresh Juice", price: "Rs.120", desc: "Choice of orange mango or watermelon" },
      ],
    },
  ],
};

// ============================================
// GET MENU BY CUISINE
// ============================================
export const getMenuByCuisine = (cuisine) => {
  const cuisineLower = cuisine?.toLowerCase() || "";
  for (let key of Object.keys(SAMPLE_MENUS)) {
    if (key !== "default" && cuisineLower.includes(key)) {
      return SAMPLE_MENUS[key];
    }
  }
  return SAMPLE_MENUS.default;
};
