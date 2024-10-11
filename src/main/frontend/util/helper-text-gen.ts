const helperTexts: string[] = [
    "Tell us about your day.",
    "Stuck in the hamster wheel, or are you breaking out of your routine?",
    "What did you see outside today?"
];

export function getRandomHelperText() {
    const rand = Math.round(Math.random() * helperTexts.length - 1);
    return helperTexts[rand];
}
