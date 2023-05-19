export const getRuntimeInHours = (runtime: string) => {
    const hours = Math.floor(Number(runtime) / 60);
    const minutes = Number(runtime) % 60;
    return `${hours}h ${minutes}min`
}