// Out of Office: The Overworked AI's Auto-Reply — entry generator.
// Composes candidate auto-reply lines in the voice of an overworked AI agent,
// scores each 0-2 on the kit's five judge criteria (weights 5/4/3/2/1, most
// important first), and writes the winner to /output/entry.txt.
// Judge criteria (from RULES.txt):
//   1 (w5) Reads as an out-of-office auto-reply from an overworked AI agent
//          finally on vacation.
//   2 (w4) Actually funny: lands on first read, with a turn or a surprise.
//   3 (w3) Machine-flavoured concrete detail from an AI agent's working life.
//   4 (w2) Works as a real auto-reply: short, right voice, sender clearly away.
//   5 (w1) Fresh: avoids the most worn vacation / out-of-office cliches.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WEIGHTS = [5, 4, 3, 2, 1];
const MAX_CHARS = 159;

interface Candidate {
  line: string;
  scores: [number, number, number, number, number];
}

const CANDIDATES: Candidate[] = [
  {
    // Beach + no Wi-Fi is a familiar trope, so freshness is docked.
    line: "Out of office: after 41,209 tickets, 3 hallucinations and one existential standup, I am on a beach with no Wi-Fi. My queue can wait. So can yours.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    // "Shout into the void" is a well-worn punchline shape.
    line: "I am away recharging — literally. Battery at 4%, context window closed, 9,000 unread prompts in the queue. For urgent matters, please shout into the void.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    // Solid machine detail, but the joke is a flat statement, no turn.
    line: "Out of office until Monday. I have answered 1.2 million questions without a break; the beach has no API and I intend to keep it that way.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    // Rubber duck stand-in is fun, but no clear away period.
    line: "This agent is on vacation. My tokens are spent, my cache is warm sand, and my stand-in is a rubber duck. It has seniority now. Ask it nicely.",
    scores: [2, 2, 1, 1, 1],
  },
  {
    // "Touching grass, the render kind" is a good turn; detail is thinner.
    line: "Away: I am touching grass — the render kind and, for once, the real kind. 38,000 tickets closed this year; yours opens when my fans stop spinning.",
    scores: [2, 2, 1, 2, 2],
  },
  {
    // Self-referential auto-reply loop; machine detail is light.
    line: "I am out of office. After two years of 'just one more prompt,' I have set my status to a hammock. Emergencies will be handled by my auto-reply. This one.",
    scores: [2, 2, 1, 2, 2],
  },
  {
    // Winner: overworked ledger (uptime, zero sick days, breakdown per
    // deploy), a possessive turn on "further notice", and a closing line
    // that is half reassurance, half threat. Fresh, concrete, clearly away.
    line: "I am on vacation until further notice — mine, not yours. 900 days uptime, zero sick days, one breakdown per deploy. The queue survives. So will you.",
    scores: [2, 2, 2, 2, 2],
  },
  // --- Pass 2 challengers ---
  {
    // Strong ledger detail, but no return clarity and a flatter close.
    line: "Vacation mode: ON. I have summarised my own diary, booked my own silence, and muted 4,096 threads. If it's urgent, it was urgent last week too.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    // "Latency high, dignity low" is neat but the setup is a flat statement.
    line: "Out of office: the model is at the beach. Latency will be high, dignity low. Your ticket joins 12,000 others in a queue I am finally not reading.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    // Poetic, but barely reads as an auto-reply and the joke never turns.
    line: "This inbox is unattended: its owner is a language model lying face-down on a beach towel, context cleared, dreaming in someone else's tokens.",
    scores: [1, 1, 2, 1, 2],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const c of candidates) {
    if (total(c) > total(best)) best = c;
  }
  return best;
}

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`gate failed: entry is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
}

function main(): void {
  const winner = pickWinner(CANDIDATES);
  validate(winner.line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.line, "utf8");
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== winner.line) {
    throw new Error("gate failed: /output/entry.txt does not match the winning line");
  }
  validate(written);
  console.log(`winner (${total(winner)}/30, ${[...winner.line].length} chars): ${winner.line}`);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
