CREATE DATABASE virelle_db;
USE virelle_db;

CREATE TABLE products (
    id INT PRIMARY KEY,
    image VARCHAR(255),
    secondImage VARCHAR(255),
    pname VARCHAR(255),
    pdescription TEXT,
    price DECIMAL(10,2),
    tag VARCHAR(50),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    rating INT,
    availability VARCHAR(50)
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
1,
'/Mah Images/Skincare/cleanser1.1.png',
'/Mah Images/Skincare/cleanser1.2.png',
'Hibiscus & Sandalwood – Radiance Boosting Cleansing Gel',
'Infused with natural AHAs from Hibiscus flowers—often called the "botox plant"—this silken gel cleanser gently resurfaces your skin texture to unveil a brilliant complexion. Precious Red Sandalwood and Licorice Root target dark spots and uneven pigmentation while you cleanse. It rinses off effortlessly with cool water, revealing a smooth, bright, and lit-from-within glow.',
50000.00,
'New',
'Skin',
'Cleanser',
4,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
2,
'/Mah Images/Skincare/cleanser2.1.png',
'/Mah Images/Skincare/cleanser2.2.png',
'Lotus & Almond Milk – Ultra-Nourishing Cleanser Gel',
'A decadent, non-foaming cream wash that wraps dry, delicate skin in rich botanical comfort. Sacred Pink Lotus extract works to improve skin elasticity, while a creamy base of cold-pressed Almond Milk and rich Shea Butter melts away dirt, SPF, and light makeup. It prevents moisture loss during washing, ensuring your face feels velvety-soft and thoroughly conditioned.',
2500.00,
'Sale',
'Skin',
'Cleanser',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
3,
'/Mah Images/Skincare/cleanser3.1.png',
'/Mah Images/Skincare/cleanser3.2.png',
'Moringa & Avocado – Deep Hydrating Cleanser',
'A luxurious, solid-to-oil melting balm engineered to break down heavy waterproof makeup, long-wear sunscreens, and deep-seated pollution. Antioxidant-rich Moringa Seed Oil acts as a natural magnet for impurities, while Avocado Butter provides deep essential fatty acids to the skin barrier. It emulsifies into a milky rinse when mixed with warm water, leaving absolutely zero oily residue.',
2500.00,
'New',
'Skin',
'Cleanser',
4,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
4,
'/Mah Images/Skincare/cleanser4.1.png',
'/Mah Images/Skincare/cleanser4.2.png',
'Aloe & Blue Chamomile – Soothing Micellar Cleanser',
'A rinse-free, cooling micellar water designed to effortlessly sweep away impurities while comforting highly reactive skin. Tiny micelle particles attract dirt and makeup like a magnet, eliminating the need for harsh rubbing. Infused with rare Blue Chamomile and Cucumber, it immediately cools hot, flushed skin, quenching dehydration and restoring instant calm.',
2500.00,
'Sale',
'Skin',
'Cleanser',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
5,
'/Mah Images/Skincare/toner1.1.png',
'/Mah Images/Skincare/toner1.2.png',
'Vetiver & Sweet Orange – Clarifying Facial Toner',
'A refreshing, pore-refining mist designed to restore balance immediately after cleansing. Formulated with earth-cooling Vetiver Root water and antibacterial Basil, it helps control excess sebum and tightens enlarged pores. Infused with Sweet Orange and Niacinamide, it brightens post-acne marks and energizes greasy, tired skin, leaving a crisp, matte, and utterly refreshed finish.',
2000.00,
'Sale',
'Skin',
'Toner',
5,
'Out'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
6,
'/Mah Images/Skincare/toner2.1.png',
'/Mah Images/Skincare/toner2.2.png',
'Saffron & Kashmiri Rose – Radiance Boosting Facial Toner',
'A luxurious, multi-active botanical mist that drenches the skin in a bouquet of pure Kashmiri Rose distillate. Infused with hand-picked Saffron, this toner instantly addresses uneven skin tone and dullness, helping to revive a natural, translucent complexion. Hyaluronic Acid delivers an immediate burst of hydration, smoothing the skin texturally so it is perfectly prepped to lock in your serums.',
2000.00,
'Sale',
'Skin',
'Toner',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
7,
'/Mah Images/Skincare/toner3.1.png',
'/Mah Images/Skincare/toner3.2.png',
'Ashwagandha & Cardamom – Ultra-Nourishing Milky Toner',
'A deeply comforting, milky treatment toner that acts as an liquid moisturizer for compromised skin barriers. Powered by adaptogenic Ashwagandha to combat skin stress and signs of aging, it works alongside nutrient-dense Rice Ferment to deeply soothe dry flakes. A base of pure Coconut Water floods dehydrated skin cells with vital electrolytes, leaving your face feeling plush, bouncy, and deeply coddled.',
2000.00,
'New',
'Skin',
'Toner',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
8,
'/Mah Images/Skincare/serum1.1.png',
'/Mah Images/Skincare/serum1.2.png',
'Gotu Kola & Zinc – Clarifying Blemish Control Serum',
'A potent, lightweight clarifying treatment formulated to target blemishes, balance sebum production, and calm active breakouts. Packed with skin-healing Gotu Kola and oil-regulating Zinc PCA, it accelerates skin recovery while preventing future flare-ups. A gentle $2$ infusion of plant-derived Salicylic Acid unclogs deep pores and refines skin texture without causing irritation, leaving your complexion clear and smooth.',
2200.00,
'New',
'Skin',
'Serum',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
9,
'/Mah Images/Skincare/serum2.1.png',
'/Mah Images/Skincare/serum2.2.png',
'Ceylon Moringa & Neroli – Glow-Activating Vitamin C Serum',
'A potent, sun-kissed daily shield packed with powerful antioxidants. Infused with nutrient-rich Ceylon Moringa and brightening Neroli Blossom, this fast-absorbing serum targets dullness, sun spots, and environmental stressors. High in natural Vitamin C, it instantly energizes tired skin, boosts collagen, and locks in a radiant, dewy, all-day glow.',
2900.00,
'Best Seller',
'Skin',
'Serum',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
10,
'/Mah Images/Skincare/serum3.1.png',
'/Mah Images/Skincare/serum3.2.png',
'Sandalwood & Alpha Arbutin – Intense Radiance Spot Corrector',
'A high-performance, brightening elixir designed to erase dark spots, sun damage, and uneven skin tone. The timeless skin-smoothing power of precious White Sandalwood works alongside clean Alpha Arbutin to safely inhibit melanin synthesis. Fortified with traditional Wild Turmeric, this silky serum sinks in quickly to transform a tired, shadowed complexion into an illuminated, uniform glow.',
3000.00,
'New',
'Skin',
'Serum',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
11,
'/Mah Images/Skincare/serum4.1.png',
'/Mah Images/Skincare/serum4.2.png',
'Lotus & Lavender – Deep Recovery Night Serum',
'An ultra-nourishing nocturnal elixir crafted to repair and renew. Infused with Sacred Lotus to boost skin elasticity and Pure Lavender oil to soothe inflammation and calm the senses. This lightweight, velvety serum works overnight to smooth fine lines, deeply hydrate, and restore your skin’s natural barrier. Wake up to a supple, rested, and completely revitalized complexion.',
3200.00,
'Trending',
'Skin',
'Serum',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
12,
'/Mah Images/Skincare/mask1.1.png',
'/Mah Images/Skincare/mask1.2.png',
'White Jasmine & Rice Bran – Illuminating Clay Mask',
'A deeply purifying treatment designed to draw out impurities while restoring a luminous, porcelain glow. Infused with exotic White Jasmine and mineral-rich clays, this creamy mask gently lifts dead skin cells, refines pores, and unifies uneven skin tone. Perfect for reviving dull, tired skin, it leaves your face feeling incredibly smooth, brightened, and refreshed.',
1500.00,
'Sale',
'Skin',
'Face Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
13,
'/Mah Images/Skincare/mask4.1.png',
'/Mah Images/Skincare/mask4.2.png',
'Charcoal & Vetiver – Pore-Purifying Volcanic Mask',
'An intense, deeply detoxifying mask crafted to shield skin from urban pollution and environmental toxins. Powered by Activated Charcoal and grounding Vetiver, this rich volcanic mud mask magnetic-pulls impurities, heavy metals, and stubborn blackheads out of the pores. It oxygenates skin tissue, controls oil, and leaves your skin feeling thoroughly reset, matte, and deeply clean.',
1700.00,
'New',
'Skin',
'Face Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
14,
'/Mah Images/Skincare/mask3.1.png',
'/Mah Images/Skincare/mask3.2.png',
'Wild Honey & Coconut – Deep Moisture Treatment Mask',
'The ultimate rescue treatment for dry, dehydrated, or climate-stressed skin. This rich, decadent mask blankets the skin in a nourishing blend of pure Wild Honey and Virgin Coconut. It deeply penetrates the skin layers to replenish lost moisture, soothe flakiness, and smooth dry lines, restoring a plump, dewy, and youthfully radiant bounce.',
1500.00,
'Sale',
'Skin',
'Face Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
15,
'/Mah Images/Skincare/mask2.1.png',
'/Mah Images/Skincare/mask2.2.png',
'Neem & Tea Tree – Clarifying Detox Mask',
'A powerful herbal rescue mask formulated to combat blemishes, excess oil, and breakouts. Combining the ancient healing powers of Neem and Tea Tree, this cooling gel-clay mask targets acne-causing bacteria, calms active inflammation, and balances sebum production without stripping away essential moisture. Skin is left feeling deeply clean, clear, and perfectly balanced.',
1800.00,
'New',
'Skin',
'Face Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
16,
'/Mah Images/Skincare/moist1.1.png',
'/Mah Images/Skincare/moist1.2.png',
'Water Lily & Crystal Salt – Ultra-Light Hydrating Gel Cream',
'A weightless, fast-absorbing gel cream designed to deliver an instant surge of hydration. Infused with pure Water Lily and mineral-rich Crystal Salt, this refreshing moisturizer quenches thirsty skin while helping to balance oil production. It leaves your complexion feeling plump, dewy, and perfectly hydrated without any heaviness or shine.',
4000.00,
'Sale',
'Skin',
'Moisturizer',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
17,
'/Mah Images/Skincare/moist2.1.png',
'/Mah Images/Skincare/moist2.2.png',
'Royal Kandyan Rose & Rice Bran – Intense Renewal Cream',
'A deeply comforting, velvety moisturizer formulated to repair dry, tired, or aging skin. Infused with the luxurious essence of Royal Kandyan Roses and nutrient-dense Rice Bran, this rich cream melts into the skin to deliver deep nourishment overnight or during dry days. It works to improve skin elasticity, fade micro-pigmentation, and restore a youthful, dewy, and majestic glow.',
4000.00,
'Sale',
'Skin',
'Moisturizer',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
18,
'/Mah Images/Skincare/moist3.1.png',
'/Mah Images/Skincare/moist3.2.png',
'White Sandalwood & Turmeric – Brightening Day Defence Fluid',
'A feather-light, brightening daily moisturizer that shields your skin from environmental stressors while actively evening out skin tone. Powered by precious White Sandalwood and healing Ceylon Turmeric, this fast-absorbing fluid targets dark spots, sun tan, and dullness. It acts as the perfect protective base under makeup, leaving your skin looking visibly luminous, clear, and perfectly balanced throughout the day.',
4000.00,
'Sale',
'Skin',
'Moisturizer',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
19,
'/Mah Images/Skincare/sunscreen1.1.png',
'/Mah Images/Skincare/sunscreen1.2.png',
'Red Sandalwood & Coconut – Hydrating Sun Protection Fluid SPF 50',
'A deeply soothing and hydrating sun shield designed to protect and comfort sensitive or climate-stressed skin. Powered by ancient Ayurvedic Red Sandalwood and nourishing Virgin Coconut oil, this fluid formula cooling down sun-exposed skin while blocking UV damage. It reinforces the skin''s natural moisture barrier, making it perfect for daily wear, beach days, or dry environments, leaving behind a healthy, dewy glow.',
5000.00,
'Sale',
'Skin',
'SunScreen',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
20,
'/Mah Images/Skincare/sunscreen2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'White Lotus & Coconut – Ultra-Hydrating Sun Shield SPF 50',
'A deeply soothing and hydrating pure-white sun shield designed to protect and comfort sensitive or climate-stressed skin. Powered by sacred White Lotus and nourishing Virgin Coconut oil, this creamy formula cools down sun-exposed skin while offering high broad-spectrum UV protection. It reinforces the skin''s natural moisture barrier, making it perfect for daily wear, beach days, or dry environments, leaving behind a healthy, perfectly protected dewy glow.',
5000.00,
'Sale',
'Skin',
'SunScreen',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
21,
'/Mah Images/Lipcare/lipbalm1.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Kandyan Rose & Avocado – Tinted Lip Hydrator',
'A rich, buttery daily balm that melts instantly onto dry lips, creating a protective cushion of hydration. It locks in moisture for hours, heals chapping, and leaves a comforting, sweet natural aroma.',
5000.00,
'New',
'Lip',
'Lip Balm',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
22,
'/Mah Images/Lipcare/lipbalm2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Virgin Coconut & Vanilla – Daily HYdrating Lip Balm',
'A feather-light, nourishing daily fluid cream designed to smooth out fine lip lines and revive your lips'' natural rosy color. It provides a weightless, satin finish perfect for wearing alone or under lipstick.',
5000.00,
'Sale',
'Lip',
'Lip Balm',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
23,
'/Mah Images/Lipcare/lipbalm3.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Spearmint & Cocoa – Cooling Lip Relief Lip Balm',
'An invigorating, ultra-cooling balm formulated to instantly rescue severely dry, sun-burnt, or peeling lips. It calms irritation immediately while delivering deep-tissue repair.',
5000.00,
'Sale',
'Lip',
'Lip Balm',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
24,
'/Mah Images/Lipcare/lipbalm4.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Pink Lotus & Almond – Plumping Lip Cream',
'A luxurious, deeply conditioning balm that delivers intense hydration along with a sheer, universally flattering rosy-pink tint. It gives lips a healthy, just-bitten look with a glossy finish.',
5000.00,
'Sale',
'Lip',
'Lip Balm',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
25,
'/Mah Images/Lipcare/lipmask1.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Kandyan Rose & Avocado – Tinted Lip Hydrator',
'A luxurious, deeply conditioning balm that delivers intense hydration along with a sheer, universally flattering rosy-pink tint. It gives lips a healthy, just-bitten look with a glossy finish.',
5000.00,
'Sale',
'Lip',
'Lip Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
26,
'/Mah Images/Lipcare/lipmask2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Kandyan Rose & Avocado – Tinted Lip Hydrator',
'A luxurious, deeply conditioning balm that delivers intense hydration along with a sheer, universally flattering rosy-pink tint. It gives lips a healthy, just-bitten look with a glossy finish.',
5000.00,
'Sale',
'Lip',
'Lip Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
27,
'/Mah Images/Lipcare/lipmask3.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Kandyan Rose & Avocado – Tinted Lip Hydrator',
'A luxurious, deeply conditioning balm that delivers intense hydration along with a sheer, universally flattering rosy-pink tint. It gives lips a healthy, just-bitten look with a glossy finish.',
5000.00,
'Sale',
'Lip',
'Lip Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
28,
'/Mah Images/Lipcare/lipoil1.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Neroli Blossom & Jojoba – High-Shine Vitamin Lip Oil',
'A non-sticky, crystal-clear lip oil that combines the deep nourishment of a treatment with the glass-like shine of a premium lip gloss. It instantly brightens the lips and leaves them looking incredibly juicy.',
5000.00,
'Sale',
'Lip',
'Lip Oil',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
29,
'/Mah Images/Lipcare/lipoil2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Watermelon & Squalane – Dewy Glow Lip Oil',
'A refreshing, ultra-lightweight lip oil that drenches lips in weightless moisture. It leaves behind a healthy, water-like dewy finish and a subtle, mouth-watering hint of fresh watermelon.',
5000.00,
'Sale',
'Lip',
'Lip Oil',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
30,
'/Mah Images/Lipcare/lipoil3.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Ceylon Cinnamon & Macadamia – Plumping Tinted Lip Oil',
'A luxurious lip oil featuring a warm, sheer nude-terracotta tint. It uses natural spices to gently stimulate microcirculation, giving the lips a fuller appearance and a beautiful, rich gloss.',
5000.00,
'Sale',
'Lip',
'Lip Oil',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
31,
'/Mah Images/Lipcare/lipoil4.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Wild Plum & Pomegranate – Antioxidant Rich Lip Oil',
'A deeply restorative berry-tinted lip oil designed to fight off free-radical damage from sun and pollution. It leaves a gorgeous, sheer berry gloss while protecting and anti-aging the lips.',
5000.00,
'Sale',
'Lip',
'Lip Oil',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
32,
'/Mah Images/Haircare/shampoo1.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Gotukola & Shikakai – Scalp Detox & Root Stimulating Shampoo',
'A purifying, sulfate-free daily cleanser designed to thoroughly detoxify the scalp while stimulating sluggish hair follicles. Infused with ancient Ayurvedic herbs, it lifts away environmental pollution, styling buildup, and excess sebum without stripping the hair''s natural oils. This clarifying formula improves oxygen flow to the roots, reduces micro-inflammation, and creates the perfect scalp environment for thicker, stronger hair to grow.',
5000.00,
'Sale',
'Hair',
'Shampoo',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
33,
'/Mah Images/Haircare/shampoo2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Virgin Coconut & Fenugreek – Intense Moisture Replenishing Shampoo',
'A rich, ultra-creamy shampoo formulated specifically to rescue dry, brittle, or chemically treated hair. It wraps each individual strand in a nourishing lather packed with healthy fatty acids and plant mucilage, smoothing down rough cuticles instantly. This hydrating cleanser drastically reduces friction during washing, prevents mid-shaft breakage, and restores a silky, manageable softness to coarse hair.',
5000.00,
'Sale',
'Hair',
'Shampoo',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
34,
'/Mah Images/Haircare/shampoo3.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Neroli Blossom & Amaranth – Volume Boosting & Shine Shampoo',
'A weightless, shine-enhancing shampoo crafted to lift fine, limp, or dull hair right from the roots. It gently cleanses while infusing the hair fibers with plant peptides that temporarily expand the diameter of each strand, creating visible body and bounce. It smooths down the hair cuticle to reflect light like glass, leaving hair looking incredibly vibrant, airy, and delicately perfumed with a luxurious citrus aroma.',
5000.00,
'Sale',
'Hair',
'Shampoo',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
35,
'/Mah Images/Haircare/condi1.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Avocado & Moringa – Deep Smoothing & Anti-Frizz Conditioner',
'A luxurious, silicone-free conditioner designed to tame stubborn frizz, flyaways, and unruly hair textures. It works by sealing the outer cuticle layer with a protective biomimetic film, preventing atmospheric humidity from entering and swelling the hair shaft. It instantly untangles knots, dramatically improves combability, and leaves a sleek, velvety-smooth finish that lasts all day.',
5000.00,
'Sale',
'Hair',
'Conditioner',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
36,
'/Mah Images/Haircare/condi2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Keratin Complex & Rice Water – Strengthening & Damage Repair Conditioner',
'A targeted fortifying conditioner engineered to rebuild structural weak spots in heat-damaged, colored, or over-processed hair. It infuses damaged areas with vegan amino acids that mimic the hair’s natural keratin pattern, physically patching up micro-tears in the cortex. This cream strengthens the hair bond against daily mechanical stress, seals split ends, and restores a healthy, resilient snap to weak strands..',
5000.00,
'Sale',
'Hair',
'Conditioner',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
37,
'/Mah Images/Haircare/condi3.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'White Lily & Aloe – Weightless Daily Hydrating Conditioner',
'An ultra-light, refreshing conditioner formulated to provide clean, daily hydration for normal, fine, or oily-prone hair types. It balances moisture levels along the mid-lengths and ends without leaving any heavy coating or residue that causes hair to fall flat. It rinses away effortlessly, leaving the hair feeling incredibly soft, bouncy, refreshed, and completely unburdened.',
5000.00,
'Sale',
'Hair',
'Conditioner',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
38,
'/Mah Images/Haircare/hairoil1.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Almond & Camellia – Luxury Gloss & Heat Protection Hair Oil',
'A modern, feather-light finishing and styling oil designed to add a mirror-like shine to the hair lengths while providing natural heat protection. It instantly smooths out dry, fried ends, controls flyaways, and seals the hair cuticle after styling. It absorbs quickly without a trace of greasiness, leaving behind incredibly soft, fluid hair with a highly polished, premium salon look.',
5000.00,
'Sale',
'Hair',
'Hair Oil',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
39,
'/Mah Images/Haircare/hairoil2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Bringharaj & Black Seed – Intensive Hair Fall & Root Repair Oil',
'A potent, traditional Ayurvedic treatment oil formulated to combat excessive hair fall, thinning, and premature graying. It is crafted by infusing active botanical roots directly into a base of nutrient-rich oils. When massaged into the scalp, it deeply penetrates the skin layers to revive dormant hair follicles, anchor hair roots firmly, and reduce scalp dryness and dandruff.',
5000.00,
'Sale',
'Hair',
'Hair Oil',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
40,
'/Mah Images/Haircare/hmask1.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Hibiscus & Wild Honey – Deep Conditioning Moisture Therapy Mask',
'An intensely rich, weekly treatment mask created to drench severely dehydrated, thirsty, and coarse hair in deep moisture. It uses a decadent, pudding-like base to deeply condition the inner layers of the hair shaft. It repairs chronic roughness, restores elastic movement to the hair fibers, and transforms parched, straw-like strands into soft, bouncing, completely hydrated locks.',
5000.00,
'Sale',
'Hair',
'Hair Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
41,
'/Mah Images/Haircare/hmask2.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Neem & Tea Tree – Scalp Purifying & Anti-Dandruff Mud Mask',
'A cooling, therapeutic clay and herbal mask designed specifically to treat troubled, itchy, or dandruff-prone scalps. It targets the root causes of scalp flaking, fungal overgrowth, and irritation. Applied directly to the scalp, it absorbs excess impurities, unclogs suffocated hair roots, and leaves your entire scalp feeling deeply refreshed, calm, and completely flake-free.',
5000.00,
'Sale',
'Hair',
'Hair Mask',
5,
'In'
);

INSERT INTO products (id,image,secondImage,pname,pdescription,price,tag,category,subcategory,rating,availability)
VALUES (
42,
'/Mah Images/Haircare/hmask3.1.png',
'/Mah Images/Skincare/sunscreen2.2.png',
'Shea Butter & Gotukola – Ultra-Repair Bond Building Hair Mask',
'An intensive, salon-grade reconstructive mask formulated to completely rehabilitate chemically over-processed, bleached, or structurally broken hair. It penetrates through the outer cuticle to the innermost layer of the hair fiber, cross-linking broken protein bonds and reinforcing the hair''s core framework. It drastically reduces split ends, eliminates brittle breakage, and restores structural integrity to damaged hair.',
5000.00,
'Sale',
'Hair',
'Hair Mask',
5,
'In'
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

SELECT * FROM users;

SELECT * FROM cart;

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,    -- This is the Blog Headline
    title VARCHAR(100) NOT NULL,   -- This is the Category (e.g., 'Skincare Tips')
    image VARCHAR(255),            -- Image URL
    author VARCHAR(255),           -- User's name
    date VARCHAR(50)               -- Date posted
);

DROP TABLE blogs;

CREATE TABLE blogs (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    author VARCHAR(255),
    date VARCHAR(50)
);

INSERT INTO blogs (id, name, title, image, author, date) VALUES
(1, 'Tips & Procedure To Apply Luxury Beauty Cosmetic Cream', 'Natural Cleansers', '/Images/Mashi Blog/blogimg1.png', 'By Hiếu Bùi', 'Jan 10, 2025'),
(2, 'The Ultimate Guide to Choosing the Right Night Serum', 'Anti-Aging', '/Images/Mashi Blog/blogimg2.png', 'By Lan Anh', 'Jan 12, 2025'),
(3, 'How to Maintain Glowing Skin During the Winter Season', 'Hydration Tips', '/Images/Mashi Blog/blogimg3.png', 'By Minh Quân', 'Jan 15, 2025'),
(4, 'Top 10 Organic Ingredients for Sensitive Skin Types', 'Eco-Beauty', '/Images/Mashi Blog/blogimg4.png', 'By Thúy Vi', 'Jan 18, 2025'),
(5, 'Essential Daily Sunscreen Routine for All Skin Tones', 'Sun Protection', '/Images/Images/blog-5.webp', 'By Hoàng Nam', 'Jan 20, 2025'),
(6, 'Secret Makeup Techniques for a Natural Everyday Look', 'Makeup Mastery', '/Images/Mashi Blog/blogimg6.jpg', 'By Ngọc Diệp', 'Jan 22, 2025'),
(7, 'Revitalize Your Hair with These Ancient Herbal Remedies', 'Hair Care', '/Images/Images/blog-7.webp', 'By Bảo Long', 'Jan 25, 2025'),
(8, 'Understanding the Science Behind Hyaluronic Acid', 'Skincare Science', '/Images/Images/blog-8.webp', 'By Khánh Linh', 'Jan 28, 2025'),
(9, 'A Beginner''s Guide to Double Cleansing for Clearer Skin', 'Daily Routine', '/Images/Images/blog-9.webp', 'By Tuấn Anh', 'Feb 01, 2025'),
(10, 'Sustainable Packaging: The Future of Beauty Brands', 'Industry Trends', '/Images/Images/blog-10.webp', 'By Phương Thảo', 'Feb 03, 2025'),
(11, 'The Benefits of Facial Yoga for a Youthful Appearance', 'Wellness', '/Images/Images/blog-11.webp', 'By Hải Yến', 'Feb 05, 2025'),
(12, 'How to Build a Minimalist Skincare Routine That Works', 'Skin Minimalism', '/Images/Images/blog-12.webp', 'By Đức Thịnh', 'Feb 08, 2025');

ALTER TABLE blogs MODIFY COLUMN id INT AUTO_INCREMENT;

SELECT * FROM blogs;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL, -- NULL if guest
    customer_email VARCHAR(255),
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Paid',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE orders;

-- 1. Main Order Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL, 
    customer_email VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Processing',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Individual Items inside those orders
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_pname VARCHAR(255) NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

SELECT * FROM orders;

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

DROP TABLE reviews;
 
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 1. Ensure orders has a status column
ALTER TABLE orders ADD COLUMN shipping_status VARCHAR(50) DEFAULT 'Processing';

-- 2. Create a table to store specific items inside an order
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_pname VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

DROP TABLE order_items;

SELECT * FROM users;

CREATE TABLE subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM subscribers;

-- 1. Add the role column
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user';

-- 2. Make YOUR account the admin
-- Replace 'azadtahira14@gmail.com' with the email you used to register
UPDATE users SET role = 'admin' WHERE email = 'admin@gmail.com';

DELETE FROM users WHERE id = 2;

SELECT * FROM products;

UPDATE products SET price = '5000' WHERE id = 1;

SELECT * FROM orders;
SELECT * FROM order_items;

