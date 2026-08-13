// Mission: The Hoisting Incident
// Run me with: node fragment_script.js

// BLOCK A
console.log("--- Block A: fragment recovery (declaration) ---");
console.log(recoverFragment("First Radio Transmission"));

function recoverFragment(name) {
    return `✅ Fragment "${name}" recovered!`;
}

// BLOCK B

const restoreFragment = function (name) {
    return `✅ Fragment "${name}" restored!`;
};
console.log("--- Block B: fragment recovery (expression) ---");
console.log(restoreFragment("First Moon Landing"));
