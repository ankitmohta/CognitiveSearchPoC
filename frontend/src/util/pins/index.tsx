import { IInfoboxWithPushPin } from 'src/types/pins';

export const pins: IInfoboxWithPushPin[] = [
    {
        infobox: {
            description: 'this location was entered as a longitude latitude pair "[36, -112]"',
            title: 'Grand Canyon',
        },
        location: [36, -112],
        pushPin: {
            description: 'Grand Canyon',
            options: { color: 'orange' },
            title: 'Grand Canyon',
        }
    },
    {
        infobox: {
            description: 'this location was entered as an address "841 Avenue of the Cities"',
            title: 'YASH Office',
        },
        location: ['841 Avenue of the Cities'],
        pushPin: {
            description: 'Yash Office',
            options: { color: '#005ba1' },
            title: 'YASH',
        }
    },
    {
        infobox: {
            description: 'this location was entered as a longitude latitude pair "[45, -84]"',
            title: 'Lake Superior',
        },
        location: [45, -84],
        pushPin: {
            description: 'Lake Superior',
            options: { color: 'lightgreen' },
            title: 'Lake Superior',
        }
    },
    {
        infobox: {
            description: 'this location was entered as the name of the location "Statue of Liberty"',
            title: 'Statue of Liberty',
        },
        location: ['Statue of Liberty'],
        pushPin: {
            description: 'Statue of Liberty',
            options: { color: 'grey' },
            title: 'Statue of Liberty',
        }
    },
]