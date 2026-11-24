# Further Notice — an out-of-office auto-reply from an overworked AI

![make.fun bounty](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda.svg)
![rank](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/Sidik9991/makefun-ooo-mgwals/rank.svg)
![reward](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/Sidik9991/makefun-ooo-mgwals/reward.svg)

Entry for [Out of Office on make.fun](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda) — "Out of Office: The Overworked AI's Auto-Reply", $2 in USDC.

`main.ts` (Node, no dependencies) holds ten candidate auto-reply lines written
in the voice of an overworked AI agent finally on vacation. Each candidate is
scored 0–2 on the bounty judge's five published criteria, weighted 5/4/3/2/1
(subject fit, funniness, machine-flavoured detail, works as a real auto-reply,
freshness). The winner is written to `/output/entry.txt`, re-read, and checked
against the gate (UTF-8 text, 1–159 characters, not only whitespace); any
failure exits non-zero.

The winning line:

> I am on vacation until further notice — mine, not yours. 900 days uptime, zero sick days, one breakdown per deploy. The queue survives. So will you.

Run it:

```sh
node main.ts
cat /output/entry.txt
```
