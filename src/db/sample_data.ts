
export const USERS = [
    { username: 'alice_k', display_name: 'Alice Kim', avatar_url: 'https://i.pravatar.cc/150?img=1'},
    { username: 'bobdiaz', display_name: 'Bob Diaz', avatar_url: 'https://i.pravatar.cc/150?img=2'},
    { username: 'charliebrown', display_name: 'Charlie Brown', avatar_url: 'https://i.pravatar.cc/150?img=3'},
    { username: 'davidwilson', display_name: 'David Wilson', avatar_url: 'https://i.pravatar.cc/150?img=4'},
    { username: 'emilyjones', display_name: 'Emily Jones', avatar_url: 'https://i.pravatar.cc/150?img=5'},
    { username: 'frankmiller', display_name: 'Frank Miller', avatar_url: 'https://i.pravatar.cc/150?img=6'},
    { username: 'gracelee', display_name: 'Grace Lee', avatar_url: 'https://i.pravatar.cc/150?img=7'},
    { username: 'henryclark', display_name: 'Henry Clark', avatar_url: 'https://i.pravatar.cc/150?img=8'},
    { username: 'isabellawilliams', display_name: 'Isabella Williams', avatar_url: 'https://i.pravatar.cc/150?img=9'},
    { username: 'jamesrodriguez', display_name: 'James Rodriguez', avatar_url: 'https://i.pravatar.cc/150?img=10'},
]

export const POSTS = [
    { image_url: 'https://picsum.photos/id/1011/600/400', caption: 'A beautiful sunrise.' },
    { image_url: 'https://picsum.photos/id/1012/600/400', caption: 'Exploring the mountains.' },
    { image_url: 'https://picsum.photos/id/1013/600/400', caption: 'City lights at night.' },
    { image_url: 'https://picsum.photos/id/1015/600/400', caption: 'Relaxing by the beach.' },
    { image_url: 'https://picsum.photos/id/1016/600/400', caption: 'A walk in the park.' },
    { image_url: 'https://picsum.photos/id/1018/600/400', caption: ' enjoying the sunshine.' },
    { image_url: 'https://picsum.photos/id/1020/600/400', caption: 'A cozy coffee shop.' },
    { image_url: 'https://picsum.photos/id/1024/600/400', caption: 'A scenic waterfall.' },
    { image_url: 'https://picsum.photos/id/1025/600/400', caption: 'Hiking in the forest.' },
    { image_url: 'https://picsum.photos/id/1027/600/400', caption: 'A peaceful lake view.' },
    { image_url: 'https://picsum.photos/id/1031/600/400', caption: 'A beautiful sunset.' }, 
    { image_url: 'https://picsum.photos/id/1033/600/400', caption: 'Exploring the city streets.' },
    { image_url: 'https://picsum.photos/id/1035/600/400', caption: 'A quiet countryside.' },
    { image_url: 'https://picsum.photos/id/1036/600/400', caption: 'A vibrant market scene.' },
    { image_url: 'https://picsum.photos/id/1037/600/400', caption: 'A serene mountain lake.' },
    { image_url: 'https://picsum.photos/id/1038/600/400', caption: 'A bustling city skyline.' },
    { image_url: 'https://picsum.photos/id/1039/600/400', caption: 'A peaceful garden path.' },
    { image_url: 'https://picsum.photos/id/1040/600/400', caption: 'A lively street festival.' },
    { image_url: 'https://picsum.photos/id/1041/600/400', caption: 'A tranquil beach scene.' },
    { image_url: 'https://picsum.photos/id/1042/600/400', caption: 'A scenic mountain trail.' },
    { image_url: 'https://picsum.photos/id/1043/600/400', caption: 'A charming village street.' },
    { image_url: 'https://picsum.photos/id/1044/600/400', caption: 'A peaceful riverbank.' },
    { image_url: 'https://picsum.photos/id/1045/600/400', caption: 'A vibrant city park.' },
    { image_url: 'https://picsum.photos/id/1046/600/400', caption: 'A quiet forest path.' }
]

// Each top-level comment can have nested `replies`, which can themselves have
// replies (arbitrary depth). insertComments() in seed.ts walks this tree
// recursively, so a reply's `parent_comment_id` is the *real* database id its
// parent got assigned on insert — never a hardcoded number here.
export const COMMENTS = [
    {
        body: 'This is a great post!',
        replies: [
            {
                body: 'Totally agree, the composition is perfect.',
                replies: [
                    { body: 'Right?? The lighting really makes it pop.', replies: [] },
                ],
            },
            { body: 'What camera did you use for this?', replies: [] },
        ],
    },
    {
        body: 'I love this picture!',
        replies: [
            { body: 'Same here, saving this one.', replies: [] },
        ],
    },
    { body: 'Amazing view!', replies: [] },
    {
        body: 'So beautiful!',
        replies: [
            {
                body: 'Where exactly is this?',
                replies: [
                    { body: 'Looks like it could be somewhere up north.', replies: [
                        { body: 'You’re right, I recognize that ridge line!', replies: [] },
                    ] },
                ],
            },
        ],
    },
    { body: 'I wish I was there!', replies: [] },
    { body: 'This is so inspiring!', replies: [
        { body: 'Makes me want to plan a trip.', replies: [] },
    ] },
    { body: 'I want to visit this place!', replies: [] },
    { body: 'This is breathtaking!', replies: [] },
    { body: 'I love the colors in this photo!', replies: [
        { body: 'The editing is so well done.', replies: [] },
    ] },
    { body: 'This is a masterpiece!', replies: [] },
    { body: 'Incredible shot!', replies: [] },
    { body: 'This is so peaceful!', replies: [] },
    { body: 'I want to go there!', replies: [] },
    { body: 'This is so relaxing!', replies: [] },
    { body: 'I love the scenery!', replies: [
        { body: 'Same, the colors are unreal.', replies: [] },
    ] },
    { body: 'This is so calming!', replies: [] },
    { body: 'I want to take a vacation here!', replies: [] },
    { body: 'This is so picturesque!', replies: [] },
    { body: 'I love the atmosphere in this photo!', replies: [] },
    { body: 'This is so serene!', replies: [] },
]