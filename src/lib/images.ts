const images = import.meta.glob('$lib/assets/*', { eager: true });

export function getImageUrl(image: string): string {
    return images[`/src/lib/assets/${image}`].default
}