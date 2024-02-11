class FoodItem:
    def __init__(self, name, calories, carbs, fat, protein):
        self.name = name
        self.calories = calories
        self.carbs = carbs
        self.fat = fat
        self.protein = protein

# Carbs, Fat, and Protein are in grams

# Grilled Angus Beef Burger
grilled_angus_beef_burger = FoodItem("Grilled Angus Beef Burger", 280, 44, 
26, 33)

# Grilled Chicken
grilled_chicken = FoodItem("Grilled Chicken", 140, 30, 20, 46)

# Grilled Cheese
grilled_cheese = FoodItem("Grilled Cheese", 320, 213, 15, 15)

# Nathan's Hotdogs
nathans_hotdogs = FoodItem("Nathan's Hotdogs", 182, 20, 13, 6)

# French Fries
french_fries = FoodItem("French Fries", 260, 29, 13, 3)

# Turkey Burger
turkey_burger = FoodItem("Turkey Burger", 291, 28, 18, 17)

# Normal Buns
normal_buns = FoodItem("Normal Buns", 203, 38, 3, 6)

# Bacon Toppings
bacon_topping = FoodItem("Bacon Topping", 128, 0.7, 11.3, 7.1)

# Red Onion Toppings, Sliced
onion_red_topping_sliced = FoodItem("Red Onion Topping, Sliced", 12, 2.8, 0, 0.3)

# Fresh Tomato Topping, Sliced
fresh_tomato_topping_sliced = FoodItem("Tomato Topping, Sliced", 5, 1.1, 0.1, 0.2)

# Green Leaf Lettuce Topping
green_leaf_lettuce_topping = FoodItem("Green Leaf Lettuce Topping", 2, 0.4, 0, 0.2)

# Dill Pickle, Sliced Topping
dill_pickle_topping_sliced = FoodItem("Dill Pickle Topping, Sliced", 0, 1, 0, 0)

#Sautéed Onions Topping
sauteed_onion_topping = FoodItem("Sautéed Onions Topping", 22, 4, 0.6, 0.5)

#Dill Pickle, Spears Topping
dill_pickle_topping_spear = FoodItem("Dill Pickle Topping, Spear", 0, 1.30, 0, 0)

# Grilled Chicken with Normal Buns
grilled_chicken_with_buns = FoodItem(
    "Grilled Chicken with Normal Buns",
    grilled_chicken.calories + normal_buns.calories,
    grilled_chicken.carbs + normal_buns.carbs,
    grilled_chicken.fat + normal_buns.fat,
    grilled_chicken.protein + normal_buns.protein
)

# Grilled Angus Beef Burger with Normal Buns
grilled_angus_beef_burger_with_buns = FoodItem(
    "Grilled Angus Beef Burger with Normal Buns",
    grilled_angus_beef_burger.calories + normal_buns.calories,
    grilled_angus_beef_burger.carbs + normal_buns.carbs,
    grilled_angus_beef_burger.fat + normal_buns.fat,
    grilled_angus_beef_burger.protein + normal_buns.protein
)

#Fresh Carrots, Shredded
fresh_carrots_shredded = FoodItem("Fresh Carrots, Shredded",12,3,0,0)

#Fresh Cilantro
fresh_cilantro = FoodItem("Fresh Cilantro",0,0,0,0)

#Fresh Green Onions
fresh_green_onions = FoodItem("Fresh Green Onions",5,1,0,0)

#Fresh Jalapeno, Sliced
fresh_jalapeno_sliced = FoodItem("Fresh Jalapeno, Sliced",4.1,0,0,0)

#Fresh Lime Wedge
fresh_lime_wedge = FoodItem("Fresh Lime Wedge", 3,1,0,0)

#Fresh Yellow Onions, Sliced
fresh_yellow_onions_sliced = FoodItem("Fresh Yellow Onions, Sliced",5,1,0,0)

#Pho with Chicken, Vegetables & Noodles
pho_with_chicken_vegetables_and_noodles = FoodItem("",361,62,3.70,19)

#Tofu
tofu = FoodItem("Tofu",80,0,8,2)

#Vegetarian Pho with Tofu, Vegetables & Noodles
vegetarian_pho_with_tofu_vegetables_and_noodles = FoodItem("Vegetarian Pho with Tofu, Vegetables & Noodles", 501,66,22,10)

