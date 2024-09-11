<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // videos from https://commons.wikimedia.org/wiki/Category:Videos
        $videos = [
            'https://upload.wikimedia.org/wikipedia/commons/2/2e/Badger_collecting_bedding_material.webm',
            'https://upload.wikimedia.org/wikipedia/commons/d/de/Downhill_footage_taken_with_GoPro_on_a_Fullface_helmet_installed_with_NINJA_MOUNT.ogv',
            'https://upload.wikimedia.org/wikipedia/commons/c/cf/Amazing_Vienna_-_Austria_2017_-_4K.webm',
            'https://upload.wikimedia.org/wikipedia/commons/2/2c/Drone_footage_of_the_megaliths_of_the_Altai_Mountains.webm',
            'https://upload.wikimedia.org/wikipedia/commons/8/8e/Colorized_film_footage_of_UK_RAF_night_bombing_of_German_cities_%281943%E2%80%931945%29.webm',
            'https://upload.wikimedia.org/wikipedia/commons/b/b5/Le_Voyage_dans_la_Lune_%281902%2C_color%29.webm',
            'https://upload.wikimedia.org/wikipedia/commons/f/fa/One_Day_in_Istanbul_4K.webm',
            'https://upload.wikimedia.org/wikipedia/commons/3/30/Summer_Solstice_Alaska_2019_4K_Creative_Commons_Epic.webm',
            'https://upload.wikimedia.org/wikipedia/commons/0/07/Lala_Lake%2C_Romania_-_4K_Aerial.webm',
            'https://upload.wikimedia.org/wikipedia/commons/9/90/View_From_Bus_Of_Nepali_Highway_To_Bhairahawa.ogv',
            'https://upload.wikimedia.org/wikipedia/commons/f/f9/2010_Sakya_Monlam_Prayer_Festival%2C_Lumbini%2C_Nepal.webm',
            'https://upload.wikimedia.org/wikipedia/commons/6/66/2015_Nepal_earthquake_01.ogv',
            'https://upload.wikimedia.org/wikipedia/commons/2/2f/Analysis_of_wasp_attack_on_Apis_dorsata_nest_-_pone.0003141.s004.mov.ogv',
            'https://upload.wikimedia.org/wikipedia/commons/c/c8/Apis_dorsata_nest_attached_to_the_ceiling_of_a_water_tower_in_Chitwan%2C_Nepal_-_pone.0003141.s003.mov.ogv',
            'https://upload.wikimedia.org/wikipedia/commons/e/e4/AsanTol_Kathmandu_Nepal.webm',
            'https://upload.wikimedia.org/wikipedia/commons/6/6a/Chhath_Puja_Sandhya_Ghats_Malangwa_Bhelhi_Sarlahi_5.webm',
            'https://upload.wikimedia.org/wikipedia/commons/f/f8/Bhairab_Dance_-_Newari_Cultural_Dance.webm',
            'https://upload.wikimedia.org/wikipedia/commons/a/ae/Cultural_Program_in_Lalitpur.ogv',
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Children_in_India_and_Nepal.webm',
            'https://upload.wikimedia.org/wikipedia/commons/d/df/Ganga_Aarti_Janakpurdham.webm',
            'https://upload.wikimedia.org/wikipedia/commons/7/75/How_to_write_in_Nepali_wiki.ogv',
            'https://upload.wikimedia.org/wikipedia/commons/a/a9/Reisevideo_Nepal_%28197X%29_-_im_Original_auf_Super-8.webm',
            'https://upload.wikimedia.org/wikipedia/commons/2/2a/Pigeons_and_Crows_on_Shankha_Park_on_the_Bank_of_Bagmati_River.webm',
            'https://upload.wikimedia.org/wikipedia/commons/4/4e/Music_Newari_Culture1.webm',
            'https://upload.wikimedia.org/wikipedia/commons/b/b8/Mount_Everest_from_a_plane.webm',
            'https://upload.wikimedia.org/wikipedia/commons/4/48/Waterfalls_Langtang_National_Park.webm',
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Yak_in_Langtang_Valley.webm',
            'https://upload.wikimedia.org/wikipedia/commons/3/30/Threshing_rice_by_hand_320x180.ogv',
        ];
        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'video_url' => $this->faker->randomElement($videos),
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
