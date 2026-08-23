// Genre and player count, so the library can be filtered by what a game
// actually is rather than only by where it came from. Keyed by game id;
// every dump of a title inherits the same values.
// "unsure": true marks a best guess - mostly prototypes and homebrew that
// are barely documented. Correct them here and the filters follow.
window.GENRE_DATA = {
 "new_amok_alt": {
  "genre": "shooter",
  "players": "p1"
 },
 "new_amok": {
  "genre": "shooter",
  "players": "p1"
 },
 "new_calculator": {
  "genre": "utility",
  "players": "p1"
 },
 "new_helicopter_buzzword": {
  "genre": "utility",
  "players": "p1",
  "unsure": true
 },
 "new_jg-munchkin": {
  "genre": "maze",
  "players": "p12"
 },
 "new_kc-pacvid": {
  "genre": "maze",
  "players": "p12"
 },
 "new_kc-pacman": {
  "genre": "maze",
  "players": "p12"
 },
 "new_ktaa": {
  "genre": "shooter",
  "players": "p1"
 },
 "new_ktaa-demo1": {
  "genre": "shooter",
  "players": "p1"
 },
 "new_ktaa-demo2": {
  "genre": "shooter",
  "players": "p1"
 },
 "new_mrroboto": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "new_planet-lander": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "new_pong_all": {
  "genre": "sports",
  "players": "p12"
 },
 "new_pong": {
  "genre": "sports",
  "players": "p12"
 },
 "new_puzzle-piece-panic": {
  "genre": "puzzle",
  "players": "p1"
 },
 "new_ppp-o2em": {
  "genre": "puzzle",
  "players": "p1"
 },
 "new_route66": {
  "genre": "racing",
  "players": "p1",
  "unsure": true
 },
 "im_atlantis": {
  "genre": "shooter",
  "players": "p12"
 },
 "im_demon-attack": {
  "genre": "shooter",
  "players": "p12"
 },
 "jo_basket-bowling_pl": {
  "genre": "sports",
  "players": "p12"
 },
 "jo_billard_pl": {
  "genre": "sports",
  "players": "p12"
 },
 "jo_chez-maxime": {
  "genre": "action",
  "players": "p12",
  "unsure": true
 },
 "jo_demon-attack_pl": {
  "genre": "shooter",
  "players": "p12"
 },
 "jo_exojet_pl": {
  "genre": "racing",
  "players": "p1",
  "unsure": true
 },
 "jo_flipper_pl": {
  "genre": "action",
  "players": "p12"
 },
 "jo_le-tresor-englouti_pl": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "jo_moto-crash_pl": {
  "genre": "racing",
  "players": "p12"
 },
 "jo_syracuse": {
  "genre": "strategy",
  "players": "p12",
  "unsure": true
 },
 "mod_br21_fix": {
  "genre": "strategy",
  "players": "p12"
 },
 "mod_vp9_examples": {
  "genre": "utility",
  "players": "p1"
 },
 "mod_demon-attack_pl": {
  "genre": "shooter",
  "players": "p12"
 },
 "mod_01pl": {
  "genre": "racing",
  "players": "p12"
 },
 "mod_05_g7400": {
  "genre": "gambling",
  "players": "p12"
 },
 "mod_06pl": {
  "genre": "sports",
  "players": "p12"
 },
 "mod_11pl": {
  "genre": "shooter",
  "players": "p1"
 },
 "mod_14fix": {
  "genre": "shooter",
  "players": "p12"
 },
 "mod_19_g7400": {
  "genre": "puzzle",
  "players": "p12"
 },
 "mod_20pl": {
  "genre": "action",
  "players": "p12"
 },
 "mod_24pl": {
  "genre": "action",
  "players": "p12"
 },
 "mod_28fix": {
  "genre": "sports",
  "players": "p12"
 },
 "mod_30fix": {
  "genre": "shooter",
  "players": "p12"
 },
 "mod_31_g7400": {
  "genre": "utility",
  "players": "p1"
 },
 "mod_35pl_fix": {
  "genre": "sports",
  "players": "p12"
 },
 "mod_36fix": {
  "genre": "sports",
  "players": "p12"
 },
 "mod_40_g7400": {
  "genre": "strategy",
  "players": "p12"
 },
 "mod_43pl": {
  "genre": "action",
  "players": "p12"
 },
 "mod_55pl": {
  "genre": "shooter",
  "players": "p1"
 },
 "mod_moto-crash_g7000": {
  "genre": "racing",
  "players": "p12"
 },
 "mod_vp31_examples": {
  "genre": "utility",
  "players": "p1"
 },
 "mod_playtag_fix": {
  "genre": "action",
  "players": "p12",
  "unsure": true
 },
 "mod_tutankham_fix": {
  "genre": "maze",
  "players": "p12"
 },
 "o2_40": {
  "genre": "utility",
  "players": "p1"
 },
 "o2_48": {
  "genre": "action",
  "players": "p1"
 },
 "o2_48alt": {
  "genre": "action",
  "players": "p1"
 },
 "o2_30": {
  "genre": "shooter",
  "players": "p12"
 },
 "o2_06": {
  "genre": "utility",
  "players": "p1"
 },
 "o2_19": {
  "genre": "action",
  "players": "p12"
 },
 "o2_10": {
  "genre": "sports",
  "players": "p12"
 },
 "o2_41": {
  "genre": "action",
  "players": "p2"
 },
 "o2_11": {
  "genre": "shooter",
  "players": "p1"
 },
 "o2_16": {
  "genre": "shooter",
  "players": "p12"
 },
 "o2_39": {
  "genre": "education",
  "players": "p1"
 },
 "o2_38": {
  "genre": "education",
  "players": "p12"
 },
 "o2_07": {
  "genre": "puzzle",
  "players": "p12"
 },
 "o2_45": {
  "genre": "shooter",
  "players": "p1"
 },
 "o2_33": {
  "genre": "utility",
  "players": "p1"
 },
 "o2_43": {
  "genre": "action",
  "players": "p12"
 },
 "o2_35": {
  "genre": "maze",
  "players": "p12"
 },
 "o2_21": {
  "genre": "strategy",
  "players": "p12"
 },
 "o2_14": {
  "genre": "shooter",
  "players": "p12"
 },
 "o2_46": {
  "genre": "maze",
  "players": "p1"
 },
 "o2_47": {
  "genre": "action",
  "players": "p12"
 },
 "vp_49": {
  "genre": "maze",
  "players": "p1"
 },
 "vp_40": {
  "genre": "strategy",
  "players": "p12"
 },
 "vp_58_12": {
  "genre": "shooter",
  "players": "p12",
  "unsure": true
 },
 "vp_04": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_03": {
  "genre": "sports",
  "players": "p2"
 },
 "vp_48": {
  "genre": "strategy",
  "players": "p12"
 },
 "vp_08": {
  "genre": "sports",
  "players": "p2"
 },
 "vp_26": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_30": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_05": {
  "genre": "gambling",
  "players": "p12"
 },
 "vp_57": {
  "genre": "action",
  "players": "p12"
 },
 "vp_19": {
  "genre": "puzzle",
  "players": "p12"
 },
 "vp_17": {
  "genre": "puzzle",
  "players": "p12"
 },
 "vp_09": {
  "genre": "utility",
  "players": "p1"
 },
 "vp_41": {
  "genre": "strategy",
  "players": "p12"
 },
 "vp_11": {
  "genre": "shooter",
  "players": "p1"
 },
 "vp_11alt": {
  "genre": "shooter",
  "players": "p1"
 },
 "vp_11pl": {
  "genre": "shooter",
  "players": "p1"
 },
 "vp_44": {
  "genre": "maze",
  "players": "p12"
 },
 "vp_29": {
  "genre": "action",
  "players": "p12"
 },
 "vp_16": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_35": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_35pl": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_36": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_27": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_28": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_24": {
  "genre": "action",
  "players": "p12"
 },
 "vp_24pl": {
  "genre": "action",
  "players": "p12"
 },
 "vp_39": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_39pl": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_10": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_14": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_59_16": {
  "genre": "action",
  "players": "p12"
 },
 "vp_13": {
  "genre": "education",
  "players": "p12"
 },
 "vp_33": {
  "genre": "action",
  "players": "p12"
 },
 "vp_33alt": {
  "genre": "action",
  "players": "p12"
 },
 "vp_a": {
  "genre": "utility",
  "players": "p1"
 },
 "vp_52pl": {
  "genre": "action",
  "players": "p12"
 },
 "vp_32": {
  "genre": "maze",
  "players": "p12"
 },
 "vp_23": {
  "genre": "gambling",
  "players": "p12"
 },
 "vp_18": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_54": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "vp_54pl": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "vp_07": {
  "genre": "education",
  "players": "p12"
 },
 "vp_37": {
  "genre": "action",
  "players": "p12"
 },
 "vp_45": {
  "genre": "education",
  "players": "p1"
 },
 "vp_38": {
  "genre": "maze",
  "players": "p12"
 },
 "vp_31": {
  "genre": "utility",
  "players": "p1"
 },
 "vp_55": {
  "genre": "shooter",
  "players": "p1"
 },
 "vp_55_12": {
  "genre": "shooter",
  "players": "p1"
 },
 "vp_55_12fix": {
  "genre": "shooter",
  "players": "p1"
 },
 "vp_53": {
  "genre": "maze",
  "players": "p12",
  "unsure": true
 },
 "vp_53pl": {
  "genre": "maze",
  "players": "p12",
  "unsure": true
 },
 "vp_56pl": {
  "genre": "action",
  "players": "p12",
  "unsure": true
 },
 "vp_02": {
  "genre": "puzzle",
  "players": "p12"
 },
 "vp_43": {
  "genre": "action",
  "players": "p12"
 },
 "vp_43pl": {
  "genre": "action",
  "players": "p12"
 },
 "vp_42": {
  "genre": "adventure",
  "players": "p12"
 },
 "vp_01": {
  "genre": "racing",
  "players": "p12"
 },
 "vp_01hack": {
  "genre": "racing",
  "players": "p12"
 },
 "vp_01pl": {
  "genre": "racing",
  "players": "p12"
 },
 "vp_15": {
  "genre": "action",
  "players": "p12"
 },
 "vp_34": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_34pl": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_21": {
  "genre": "strategy",
  "players": "p12"
 },
 "vp_25": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_22": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_22hack": {
  "genre": "shooter",
  "players": "p12"
 },
 "vp_20": {
  "genre": "action",
  "players": "p12"
 },
 "vp_20pl": {
  "genre": "action",
  "players": "p12"
 },
 "vp_50": {
  "genre": "action",
  "players": "p12"
 },
 "vp_06": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_06pl": {
  "genre": "sports",
  "players": "p12"
 },
 "vp_51pl": {
  "genre": "shooter",
  "players": "p1"
 },
 "vp_46": {
  "genre": "strategy",
  "players": "p12"
 },
 "vp_47": {
  "genre": "action",
  "players": "p12"
 },
 "vp_60_16": {
  "genre": "racing",
  "players": "p12"
 },
 "vp_12": {
  "genre": "maze",
  "players": "p12"
 },
 "Vp40_F": {
  "genre": "strategy",
  "players": "p12"
 },
 "Vp05_F": {
  "genre": "gambling",
  "players": "p12"
 },
 "Vp11+_F": {
  "genre": "shooter",
  "players": "p1"
 },
 "Vp11_F": {
  "genre": "shooter",
  "players": "p1"
 },
 "Vp29_F": {
  "genre": "action",
  "players": "p12"
 },
 "Vp35_F": {
  "genre": "sports",
  "players": "p12"
 },
 "Vp36_F": {
  "genre": "sports",
  "players": "p12"
 },
 "Vp28_F": {
  "genre": "sports",
  "players": "p12"
 },
 "Vp24_F": {
  "genre": "action",
  "players": "p12"
 },
 "Vp52+_F": {
  "genre": "action",
  "players": "p12"
 },
 "Vp23_F": {
  "genre": "gambling",
  "players": "p12"
 },
 "Vp18_F": {
  "genre": "shooter",
  "players": "p12"
 },
 "Vp07_F": {
  "genre": "education",
  "players": "p12"
 },
 "Vp45_F": {
  "genre": "education",
  "players": "p1"
 },
 "Vp42_F": {
  "genre": "adventure",
  "players": "p12"
 },
 "vp01+_F": {
  "genre": "racing",
  "players": "p12"
 },
 "Vp01_F": {
  "genre": "racing",
  "players": "p12"
 },
 "Vp25_F": {
  "genre": "sports",
  "players": "p12"
 },
 "Vp06_F": {
  "genre": "sports",
  "players": "p12"
 },
 "Vp47_F": {
  "genre": "action",
  "players": "p12"
 },
 "Vp12_F": {
  "genre": "maze",
  "players": "p12"
 },
 "pal_flashpoint": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "pal_acrobats": {
  "genre": "action",
  "players": "p12"
 },
 "pal_nimble-numbers-ned": {
  "genre": "education",
  "players": "p1"
 },
 "pal_type-and-tell": {
  "genre": "utility",
  "players": "p1"
 },
 "pb_frogger": {
  "genre": "action",
  "players": "p12"
 },
 "pb_popeye": {
  "genre": "action",
  "players": "p12"
 },
 "pb_q-bert": {
  "genre": "action",
  "players": "p12"
 },
 "pb_super-cobra": {
  "genre": "shooter",
  "players": "p12"
 },
 "pr_clay-pigeon_pl": {
  "genre": "shooter",
  "players": "p12"
 },
 "pr_clay-pigeon_pl_alt": {
  "genre": "shooter",
  "players": "p12"
 },
 "pr_interpol": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "pr_martian-threat_alt": {
  "genre": "shooter",
  "players": "p1"
 },
 "pr_martian-threat": {
  "genre": "shooter",
  "players": "p1"
 },
 "pr_mission-impossible": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "pr_nightfighter": {
  "genre": "shooter",
  "players": "p1",
  "unsure": true
 },
 "pr_pinball": {
  "genre": "action",
  "players": "p12"
 },
 "pr_playtag": {
  "genre": "action",
  "players": "p12",
  "unsure": true
 },
 "pr_red-baron": {
  "genre": "shooter",
  "players": "p12"
 },
 "pr_red-baron_alt": {
  "genre": "shooter",
  "players": "p12"
 },
 "pr_robot-city": {
  "genre": "action",
  "players": "p1",
  "unsure": true
 },
 "pr_shark-hunter": {
  "genre": "shooter",
  "players": "p1",
  "unsure": true
 },
 "pr_spiderman_alt": {
  "genre": "action",
  "players": "p1"
 },
 "pr_spiderman": {
  "genre": "action",
  "players": "p1"
 },
 "pr_tutankham": {
  "genre": "maze",
  "players": "p12"
 },
 "csv1": {
  "genre": "education",
  "players": "p1"
 },
 "csv2": {
  "genre": "education",
  "players": "p1"
 },
 "br_9434": {
  "genre": "strategy",
  "players": "p12"
 },
 "br_9461": {
  "genre": "shooter",
  "players": "p12"
 },
 "br_9462": {
  "genre": "puzzle",
  "players": "p12"
 },
 "br_9463": {
  "genre": "puzzle",
  "players": "p12"
 },
 "br_9468": {
  "genre": "education",
  "players": "p1"
 },
 "br_9469": {
  "genre": "action",
  "players": "p12"
 },
 "br_9472": {
  "genre": "action",
  "players": "p12"
 },
 "br_9473": {
  "genre": "shooter",
  "players": "p1"
 },
 "br_9474": {
  "genre": "shooter",
  "players": "p12"
 },
 "br_9475": {
  "genre": "shooter",
  "players": "p12"
 },
 "br_9476": {
  "genre": "action",
  "players": "p1"
 },
 "br_9477": {
  "genre": "shooter",
  "players": "p12"
 },
 "br_9483": {
  "genre": "action",
  "players": "p12"
 },
 "br_9484": {
  "genre": "action",
  "players": "p12"
 },
 "br_9485": {
  "genre": "action",
  "players": "p12"
 },
 "br_9486": {
  "genre": "shooter",
  "players": "p12"
 },
 "c64_boulder_dash": {
  "genre": "puzzle",
  "players": "p1"
 },
 "c64_impossible_mission": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_last_ninja": {
  "genre": "adventure",
  "players": "p1"
 },
 "c64_wizball": {
  "genre": "shooter",
  "players": "p12"
 },
 "c64_uridium": {
  "genre": "shooter",
  "players": "p1"
 },
 "c64_paradroid": {
  "genre": "strategy",
  "players": "p1"
 },
 "c64_turrican2": {
  "genre": "shooter",
  "players": "p1"
 },
 "c64_maniac_mansion": {
  "genre": "adventure",
  "players": "p1"
 },
 "c64_zak_mckracken": {
  "genre": "adventure",
  "players": "p1"
 },
 "c64_elite": {
  "genre": "strategy",
  "players": "p1"
 },
 "c64_ik_plus": {
  "genre": "fighting",
  "players": "p12"
 },
 "c64_bruce_lee": {
  "genre": "platformer",
  "players": "p12"
 },
 "c64_commando": {
  "genre": "shooter",
  "players": "p1"
 },
 "c64_bubble_bobble": {
  "genre": "platformer",
  "players": "p12"
 },
 "c64_giana_sisters": {
  "genre": "platformer",
  "players": "p12"
 },
 "c64_katakis": {
  "genre": "shooter",
  "players": "p12"
 },
 "c64_creatures": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_mayhem": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_archon": {
  "genre": "strategy",
  "players": "p12"
 },
 "c64_mule": {
  "genre": "strategy",
  "players": "p12"
 },
 "c64_california_games": {
  "genre": "sports",
  "players": "p12"
 },
 "c64_winter_games": {
  "genre": "sports",
  "players": "p12"
 },
 "c64_pitstop2": {
  "genre": "racing",
  "players": "p12"
 },
 "c64_defender_crown": {
  "genre": "strategy",
  "players": "p1"
 },
 "c64_barbarian": {
  "genre": "fighting",
  "players": "p12"
 },
 "c64_microprose_soccer": {
  "genre": "sports",
  "players": "p12"
 },
 "c64_paperboy": {
  "genre": "action",
  "players": "p12"
 },
 "c64_test_drive": {
  "genre": "racing",
  "players": "p1"
 },
 "c64_target_renegade": {
  "genre": "action",
  "players": "p1"
 },
 "c64_sword_of_fargoal": {
  "genre": "adventure",
  "players": "p1"
 },
 "c64_shadow_of_the_beast": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_operation_wolf": {
  "genre": "shooter",
  "players": "p1"
 },
 "c64_double_dragon": {
  "genre": "action",
  "players": "p12"
 },
 "c64_spy_vs_spy": {
  "genre": "action",
  "players": "p12"
 },
 "c64_ghostbusters": {
  "genre": "action",
  "players": "p1"
 },
 "c64_pool_of_radiance": {
  "genre": "strategy",
  "players": "p1"
 },
 "c64_turrican": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_wasteland": {
  "genre": "strategy",
  "players": "p1"
 },
 "c64_dropzone": {
  "genre": "shooter",
  "players": "p1"
 },
 "c64_laser_squad": {
  "genre": "strategy",
  "players": "p12"
 },
 "c64_congo_bongo": {
  "genre": "platformer",
  "players": "p12"
 },
 "c64_frogger": {
  "genre": "action",
  "players": "p12"
 },
 "c64_castle_wolfenstein": {
  "genre": "action",
  "players": "p1"
 },
 "c64_blood_money": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_doom": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_wolfenstein3d": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_commander_keen": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_duke_nukem_2": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_prince_of_persia": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_leisure_suit_larry": {
  "genre": "adventure",
  "players": "p1"
 },
 "c64_hb_c64anabalt": {
  "genre": "action",
  "players": "p1"
 },
 "c64_hb_rescuing_orc": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_hb_doc_cosmos": {
  "genre": "adventure",
  "players": "p1"
 },
 "c64_hb_tenebra2": {
  "genre": "puzzle",
  "players": "p1"
 },
 "c64_hb_bomberland": {
  "genre": "action",
  "players": "p12"
 },
 "c64_hb_bruce_lee_return_of_fury": {
  "genre": "platformer",
  "players": "p12"
 },
 "c64_hb_rocket_smash_ex": {
  "genre": "action",
  "players": "p1"
 },
 "c64_hb_micro_hexagon": {
  "genre": "action",
  "players": "p1"
 },
 "c64_hb_wolfling": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_hb_runn_n_gunn": {
  "genre": "action",
  "players": "p1"
 },
 "c64_hb_grid_pix": {
  "genre": "puzzle",
  "players": "p1"
 },
 "c64_hb_super_bread_box": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_hb_hero_is_back": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_hb_luftrauserz": {
  "genre": "shooter",
  "players": "p1"
 },
 "c64_hb_bagman_strikes_back": {
  "genre": "platformer",
  "players": "p1"
 },
 "c64_hb_galaxian_dx": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_civilization": {
  "genre": "strategy",
  "players": "p1"
 },
 "pc_simcity": {
  "genre": "strategy",
  "players": "p1"
 },
 "pc_dune2": {
  "genre": "strategy",
  "players": "p1"
 },
 "pc_tim": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_oregon_trail": {
  "genre": "education",
  "players": "p1"
 },
 "pc_keen2": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_keen3": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_keen4": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_keen5": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_keen6": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_duke_nukem": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_duke_nukem_3d": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_kq1": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_kq2": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_kq3": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_kq4": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_kq5": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_kq6": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_kq7": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_doom2": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_final_doom_tnt": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_final_doom_plutonia": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_spear_of_destiny": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_xcom_ufo_defense": {
  "genre": "strategy",
  "players": "p1"
 },
 "pc_sq1": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_sq2": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_sq3": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_sq4": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_sq5": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_sq6": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_lemmings": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_onml": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_xmas_lemmings": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_holiday_lemmings": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_lemmings2": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_anwol": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_blood_money": {
  "genre": "shooter",
  "players": "p1"
 },
 "pc_hb_gates": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_hb_disksweeper": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_hb_pantsmo": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_hb_noudar": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_hb_alienintruder": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_hb_goldmine": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_hb_traxtor": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_hb_queens": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_hb_spacecavern": {
  "genre": "platformer",
  "players": "p1"
 },
 "pc_hb_barren": {
  "genre": "strategy",
  "players": "p1"
 },
 "pc_hb_chambers": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_hb_hibernated1": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_hb_eightfeet": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_hb_lake": {
  "genre": "adventure",
  "players": "p1"
 },
 "pc_hb_acronia": {
  "genre": "action",
  "players": "p1"
 },
 "pc_hb_catsbroombas": {
  "genre": "puzzle",
  "players": "p1"
 },
 "pc_gta1": {
  "genre": "action",
  "players": "p1"
 },
 "c64_outrun": {
  "genre": "racing",
  "players": "p1"
 },
 "pc_outrun": {
  "genre": "racing",
  "players": "p1"
 }
};
