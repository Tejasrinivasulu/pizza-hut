import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pizza-fiesta';

const IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop',
  iceCream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
};

const PIZZA_IMAGE_BASE = '/assets/menu/pizza';
const DRINKS_IMAGE_BASE = '/assets/menu/drinks';
const BURGERS_IMAGE_BASE = '/assets/menu/burgers';
const ICE_CREAMS_IMAGE_BASE = '/assets/menu/ice-creams';
const PASTA_IMAGE_BASE = '/assets/menu/pasta';

const MENU = {
  Pizza: [
    { name: 'Cheese Pizza', price: 199, description: 'Classic cheese pizza with mozzarella and tomato sauce.', image: `${PIZZA_IMAGE_BASE}/cheese-pizza.png` },
    { name: 'Veg Pizza', price: 229, description: 'Loaded with fresh seasonal vegetables.', image: `${PIZZA_IMAGE_BASE}/veg-pizza.png` },
    { name: 'Paneer Pizza', price: 259, description: 'Spiced paneer cubes on a cheesy base.', image: `${PIZZA_IMAGE_BASE}/paneer-pizza.png` },
    { name: 'Corn Pizza', price: 239, description: 'Sweet corn and cheese on crispy crust.', image: `${PIZZA_IMAGE_BASE}/corn-pizza.png` },
    { name: 'Mushroom Pizza', price: 249, description: 'Fresh mushrooms with herbs and cheese.', image: `${PIZZA_IMAGE_BASE}/mushroom-pizza.png` },
    { name: 'Farmhouse Pizza', price: 299, description: 'Bell peppers, onions, corn, and mushrooms.', image: `${PIZZA_IMAGE_BASE}/farmhouse-pizza.png` },
    { name: 'Chicken Pizza', price: 329, description: 'Grilled chicken with mozzarella cheese.', image: `${PIZZA_IMAGE_BASE}/chicken-pizza.png` },
    { name: 'Pepperoni Pizza', price: 349, description: 'Spicy pepperoni with extra cheese.', image: `${PIZZA_IMAGE_BASE}/pepperoni-pizza.png` },
    { name: 'BBQ Chicken Pizza', price: 379, description: 'BBQ sauce, chicken, and red onions.', image: `${PIZZA_IMAGE_BASE}/bbq-chicken-pizza.png` },
    { name: 'Mexican Pizza', price: 399, description: 'Jalapeños, beans, corn, and spicy sauce.', image: `${PIZZA_IMAGE_BASE}/mexican-pizza.png` },
  ],
  Drinks: [
    { name: 'Fresh Lemon Soda', price: 69, description: 'Chilled lemon soda with mint and fresh lemon.', image: `${DRINKS_IMAGE_BASE}/fresh-lemon-soda.png` },
    { name: 'Mint Mojito', price: 119, description: 'Refreshing mint mojito mocktail with lime and ice.', image: `${DRINKS_IMAGE_BASE}/mint-mojito.png` },
    { name: 'Chocolate Milkshake', price: 149, description: 'Thick chocolate milkshake with whipped cream.', image: `${DRINKS_IMAGE_BASE}/chocolate-milkshake.png` },
    { name: 'Cold Coffee', price: 99, description: 'Iced coffee blended with milk and ice.', image: `${DRINKS_IMAGE_BASE}/cold-coffee.png` },
    { name: 'Lemon Iced Tea', price: 89, description: 'Chilled lemon iced tea with fresh lemon slices.', image: `${DRINKS_IMAGE_BASE}/lemon-iced-tea.png` },
    { name: 'Strawberry Milkshake', price: 149, description: 'Creamy strawberry milkshake topped with whipped cream.', image: `${DRINKS_IMAGE_BASE}/strawberry-milkshake.png` },
    { name: 'Mango Smoothie', price: 129, description: 'Fresh mango smoothie with ripe mango chunks.', image: `${DRINKS_IMAGE_BASE}/mango-smoothie.png` },
    { name: 'Oreo Shake', price: 159, description: 'Rich Oreo milkshake with cookie crumble and cream.', image: `${DRINKS_IMAGE_BASE}/oreo-shake.png` },
    { name: 'Watermelon Cooler', price: 119, description: 'Chilled blended watermelon cooler — sweet and refreshing.', image: `${DRINKS_IMAGE_BASE}/watermelon-cooler.png` },
    { name: 'Virgin Blue Lagoon', price: 129, description: 'Electric blue citrus mocktail with lime and soda.', image: `${DRINKS_IMAGE_BASE}/virgin-blue-lagoon.png` },
  ],
  Burgers: [
    { name: 'Veg Burger', price: 99, description: 'Crispy veg patty with fresh veggies.', image: `${BURGERS_IMAGE_BASE}/veg-burger.png` },
    { name: 'Cheese Burger', price: 119, description: 'Cheese slice on a classic veg patty.', image: `${BURGERS_IMAGE_BASE}/cheese-burger.png` },
    { name: 'Paneer Burger', price: 139, description: 'Grilled paneer patty with mayo.', image: `${BURGERS_IMAGE_BASE}/paneer-burger.png` },
    { name: 'Chicken Burger', price: 149, description: 'Juicy chicken patty with lettuce.', image: `${BURGERS_IMAGE_BASE}/chicken-burger.png` },
    { name: 'Crispy Chicken Burger', price: 169, description: 'Crunchy fried chicken fillet burger.', image: `${BURGERS_IMAGE_BASE}/crispy-chicken-burger.png` },
    { name: 'Double Cheese Burger', price: 179, description: 'Two cheese slices, double flavour.', image: `${BURGERS_IMAGE_BASE}/double-cheese-burger.png` },
    { name: 'Zinger Burger', price: 189, description: 'Spicy zinger chicken burger.', image: `${BURGERS_IMAGE_BASE}/zinger-burger.png` },
    { name: 'BBQ Burger', price: 199, description: 'BBQ sauce with grilled patty.', image: `${BURGERS_IMAGE_BASE}/bbq-burger.png` },
    { name: 'Spicy Burger', price: 159, description: 'Hot and spicy masala burger.', image: `${BURGERS_IMAGE_BASE}/spicy-burger.png` },
    { name: 'Veggie Burger', price: 129, description: 'Mixed veggie patty with herbs.', image: `${BURGERS_IMAGE_BASE}/veggie-burger.png` },
  ],
  'Ice-creams': [
    { name: 'Vanilla Ice Cream', price: 79, description: 'Classic creamy vanilla scoop.', image: `${ICE_CREAMS_IMAGE_BASE}/vanilla-ice-cream.png` },
    { name: 'Chocolate Ice Cream', price: 89, description: 'Rich chocolate ice cream.', image: `${ICE_CREAMS_IMAGE_BASE}/chocolate-ice-cream.png` },
    { name: 'Strawberry Ice Cream', price: 89, description: 'Fresh strawberry flavour.', image: `${ICE_CREAMS_IMAGE_BASE}/strawberry-ice-cream.png` },
    { name: 'Mango Ice Cream', price: 99, description: 'Alphonso mango ice cream.', image: `${ICE_CREAMS_IMAGE_BASE}/mango-ice-cream.png` },
    { name: 'Butterscotch Ice Cream', price: 99, description: 'Butterscotch chips and sauce.', image: `${ICE_CREAMS_IMAGE_BASE}/butterscotch-ice-cream.png` },
    { name: 'Black Currant Ice Cream', price: 109, description: 'Tangy black currant scoop.', image: `${ICE_CREAMS_IMAGE_BASE}/black-currant-ice-cream.png` },
    { name: 'Cookies & Cream Ice Cream', price: 119, description: 'Cookie crumble in vanilla cream.', image: `${ICE_CREAMS_IMAGE_BASE}/cookies-cream-ice-cream.png` },
    { name: 'Kulfi Ice Cream', price: 89, description: 'Traditional Indian kulfi.', image: `${ICE_CREAMS_IMAGE_BASE}/kulfi-ice-cream.png` },
    { name: 'Chocolate Chip Ice Cream', price: 119, description: 'Vanilla with chocolate chips.', image: `${ICE_CREAMS_IMAGE_BASE}/chocolate-chip-ice-cream.png` },
    { name: 'Fruit Ice Cream', price: 109, description: 'Mixed fruit flavoured ice cream.', image: `${ICE_CREAMS_IMAGE_BASE}/fruit-ice-cream.png` },
  ],
  Pasta: [
    { name: 'White Sauce Pasta', price: 179, description: 'Creamy white sauce penne pasta.', image: `${PASTA_IMAGE_BASE}/white-sauce-pasta.png` },
    { name: 'Red Sauce Pasta', price: 169, description: 'Tangy tomato red sauce pasta.', image: `${PASTA_IMAGE_BASE}/red-sauce-pasta.png` },
    { name: 'Cheese Pasta', price: 199, description: 'Extra cheese loaded pasta.', image: `${PASTA_IMAGE_BASE}/cheese-pasta.png` },
    { name: 'Veg Pasta', price: 159, description: 'Mixed vegetables in herb sauce.', image: `${PASTA_IMAGE_BASE}/veg-pasta.png` },
    { name: 'Chicken Pasta', price: 229, description: 'Grilled chicken with pasta.', image: `${PASTA_IMAGE_BASE}/chicken-pasta.png` },
    { name: 'Alfredo Pasta', price: 249, description: 'Classic Alfredo cream sauce.', image: `${PASTA_IMAGE_BASE}/alfredo-pasta.png` },
    { name: 'Penne Pasta', price: 189, description: 'Penne in signature house sauce.', image: `${PASTA_IMAGE_BASE}/penne-pasta.png` },
    { name: 'Spicy Pasta', price: 199, description: 'Chilli flakes and spicy tomato sauce.', image: `${PASTA_IMAGE_BASE}/spicy-pasta.png` },
    { name: 'Garlic Pasta', price: 179, description: 'Garlic butter tossed pasta.', image: `${PASTA_IMAGE_BASE}/garlic-pasta.png` },
    { name: 'Mushroom Pasta', price: 209, description: 'Sautéed mushrooms in cream sauce.', image: `${PASTA_IMAGE_BASE}/mushroom-pasta.png` },
  ],
};

const CATEGORY_IMAGES = {
  Pizza: `${PIZZA_IMAGE_BASE}/cheese-pizza.png`,
  Drinks: `${DRINKS_IMAGE_BASE}/fresh-lemon-soda.png`,
  Burgers: `${BURGERS_IMAGE_BASE}/veg-burger.png`,
  'Ice-creams': `${ICE_CREAMS_IMAGE_BASE}/vanilla-ice-cream.png`,
  Pasta: `${PASTA_IMAGE_BASE}/white-sauce-pasta.png`,
};

const CategorySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  image: { type: String },
}, { timestamps: true });

const ExtraPriceSchema = new mongoose.Schema({ name: String, price: Number });

const MenuItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  basePrice: Number,
  sizes: [ExtraPriceSchema],
  extraIngredientsPrices: [ExtraPriceSchema],
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  phone: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const Category = mongoose.models?.Category || mongoose.model('Category', CategorySchema);
const MenuItem = mongoose.models?.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
const User = mongoose.models?.User || mongoose.model('User', UserSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Promise.all([
    Category.deleteMany({}),
    MenuItem.deleteMany({}),
    User.deleteMany({}),
  ]);

  const categoryDocs = {};
  for (const name of Object.keys(MENU)) {
    categoryDocs[name] = await Category.create({
      name,
      image: CATEGORY_IMAGES[name],
    });
  }

  const menuItems = [];
  for (const [categoryName, items] of Object.entries(MENU)) {
    for (const item of items) {
      menuItems.push({
        name: item.name,
        image: item.image || CATEGORY_IMAGES[categoryName],
        description: item.description,
        category: categoryDocs[categoryName]._id,
        basePrice: item.price,
        sizes: [],
        extraIngredientsPrices: [],
      });
    }
  }

  await MenuItem.insertMany(menuItems);

  const salt = bcrypt.genSaltSync(10);
  await User.insertMany([
    {
      name: 'Admin User',
      email: 'admin@pizzafiesta.com',
      password: bcrypt.hashSync('admin12345', salt),
      isAdmin: true,
      phone: '555-0100',
      streetAddress: '123 Pizza Lane',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
    },
    {
      name: 'Test Customer',
      email: 'customer@test.com',
      password: bcrypt.hashSync('user12345', salt),
      isAdmin: false,
    },
  ]);

  console.log(`Seed complete! ${menuItems.length} menu items across ${Object.keys(MENU).length} categories.`);
  console.log('Admin login: admin@pizzafiesta.com / admin12345');
  console.log('Customer login: customer@test.com / user12345');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
