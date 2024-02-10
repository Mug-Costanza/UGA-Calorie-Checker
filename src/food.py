class FoodItem:
    def __init__(self, name, calories, carbs, fat, protein):
        self.name = name
        self.calories = calories
        self.carbs = carbs
        self.fat = fat
        self.protein = protein

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

