import { IDocument } from 'src/types/documents';

export const rNumberRange = (max: number, min?: number): number => {
    return Math.floor(Math.random() * max) + (min === 0 ? 0 : (min || 1));
}

export const rLetter = (): string => {
    return 'abcdefghijklmnopqrstuvwxyz'[rNumberRange(26, 0)];
}

const loremIpsum: string[] = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Integer sed molestie quam, eleifend imperdiet turpis.
In ut mauris enim. Curabitur eget tempus leo. Etiam
faucibus placerat vulputate. Suspendisse potenti.
In risus velit, scelerisque maximus vulputate vitae,
mollis sed mi. In eleifend, tortor in ultricies pulvinar,
lorem ipsum tincidunt eros, ut dignissim orci ipsum ut
tortor. Mauris porta lorem non nunc malesuada, sed euismod
metus gravida. Morbi tempus ante ac cursus finibus.
Phasellus elementum ac justo ut rutrum. Aliquam id tempus
tellus, vitae consectetur leo. Mauris sapien urna, feugiat
sed nulla id, dictum pharetra velit. Quisque accumsan
blandit orci nec sollicitudin. Phasellus vel ipsum consequat
arcu finibus pretium nec ut leo.`.split(' ');

export const rTag = (): string => loremIpsum[rNumberRange(loremIpsum.length-1, 0)];

export const rDocument = (): IDocument => ({
    pages: Array(rNumberRange(5)).fill(0).map(m => rNumberRange(5)).map(p => ({
        source: `/docs/phb/${p}.png`,
        tags: Array(rNumberRange(26)).fill(0).map(rTag),
    })),
    title: `${rLetter()}${rLetter()}${rLetter()}_${rNumberRange(1000000000)}`,
})

export const docs = (): IDocument[] => Array(rNumberRange(50,25)).fill(0).map(rDocument);