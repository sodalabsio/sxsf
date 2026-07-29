import { Story } from '../types';

export const thisStory: Story = {
  id: 'shape-of-consent-2026-07-29',
  title: 'The Shape of Consent',
  date: '2026-07-29',
  slug: 'shape-of-consent',
  excerpt:
    'In a republic where the President has just declared an impossible landslide, a statistician must talk her own movement out of its most thrilling proof, because the truth that can weaken a regime is not the one that feels best but the one you can defend.',
  imageUrl: 'assets/shape-of-consent.png',
  tags: [
    'election-forensics',
    'statistics',
    'computational-social-science',
    'authoritarianism',
    'civil-resistance',
    'data-activism'
  ],
  content: `They announced seventy-one percent at 11:40 in the evening, and within the hour the capital had two kinds of silence.

One was the silence of Solvat's official channels: the state broadcaster looping the same grave anchor, the same map of the Republic of Kavring flooding gold province by province, the same phrase in the crawl beneath. A decisive mandate for continuity. President Renko, twenty-six years in power, had asked the nation whether it wanted him for six more, and the nation had apparently answered with a shout.

The other silence belonged to the apartment on Vetch Street, where Mira Solenko sat in front of three monitors and did not shout at all.

She had turned the sound off an hour ago. What she was watching was not the broadcast but a scatter of points slowly assembling on her middle screen: one dot for each of the Republic's forty-one thousand polling stations, each placed by two numbers. Turnout along the bottom. Renko's share of the vote up the side.

In the elections she trusted, from the years before she stopped trusting any of them, a plot like this made a single soft cloud, a smear of ordinary human variety. Some towns turned out more, some less. Some liked the incumbent, some did not. The cloud drifted but it held together, the way a flock holds together.

What sat on her screen tonight was not one cloud. It was a cloud, and then, up in the far corner where turnout approached everyone and Renko's share approached all of them, a second dense knot. A bright, impossible thumbprint pressed into the top right of the nation.

Mira had a name for that knot, learned in a language of journals she had read until her eyes bled. The fingerprint of extreme intervention. Stations where almost every registered voter had come, and almost every one of them had chosen the same man.

She should have felt triumphant. Instead she felt the old caution close over her like cold water, because she knew exactly how many innocent things could counterfeit that shape.

The door opened without a knock. Only one person still did that.

Danel Ruse came in carrying the weather of the street with him, rain on his shoulders and a brightness in his face that she had not seen since university. Back then he had been the one who could make a lecture hall lean forward. Now he was the voice of the Concord, the fragile coalition of unions and students and tired professionals that had decided, this year, to stop pretending the vote was real.

"You've seen it," he said. It was not a question. He set his phone on her desk, screen up, and she felt her stomach drop before she even read it.

It was a graphic. Clean, confident, already beautiful in the way things engineered to travel are beautiful. A bar chart of digits, gold against black, with a headline that had clearly been written to be screenshotted: THE NUMBERS THEMSELVES CONFESS. Beneath it, an explanation any furious citizen could follow in ten seconds. The second digits of Renko's vote counts did not follow the natural law they were supposed to follow. Therefore the counts were invented. Therefore the whole election was a lie.

"Two hundred thousand shares since the announcement," Danel said. "It's on every feed. People are printing it. Someone's already put it on a banner outside the commission." He grinned, exhausted and elated. "Mira. The math is on our side and everyone can see it. We lead with this tomorrow."

Mira looked at the graphic for a long moment.

"Where did it come from?" she asked.

"Does it matter? It's true."

"Danel." She rubbed her eyes. "It isn't."

The grin faltered. "It's Benford's law. It's in the textbooks."

"The first-digit law is in the textbooks. This is the second-digit test on vote counts, and it does not do what that caption says it does." She pulled her keyboard toward her, because she could never say this kind of thing without showing it. "Watch."

She had, on her drives, the full precinct returns from the last three elections the international monitors had actually called clean, from three neighbouring republics with nothing to hide. She ran the same test the graphic had run. She ran it on honest data.

Two of the three clean elections failed it. The digits strayed from the law by more than Renko's had.

"That test flags honest elections as fraud and passes rigged ones as clean, more or less at a coin's mercy," she said. "People have known that for fifteen years. It was taken apart in the journals before you and I finished our degrees. If we stand up tomorrow and tell the country the digits confess, we are handing Renko's people a gift."

Danel's jaw set in the way she remembered. "You always do this. You find the one reason the good thing is complicated."

"Because the complication is where they will cut us." She turned to face him fully. "Renko has a statistician too. His name is Emin Karr, he wears very good suits, and he has been on state television every year for a decade being reasonable. If we make that graphic the face of our case, Karr will go on air, run the exact demonstration I just ran, and show the whole Republic that our proof also convicts Switzerland. And when our headline number dies on television, every other thing we say dies with it. That is how they win. Not by hiding the fraud. By letting us over-claim it and then correcting us in public."

For a moment the room held only the rain.

"Then what," Danel said quietly, "do we have?"

Mira turned back to the second screen, to the thumbprint in the corner.

"We have to earn it," she said. "The slow way. The way they can't take back."

---

She did not sleep. She rarely did in the good years; she certainly would not tonight.

The fingerprint plot was suggestive, but suggestion was not the currency she needed. She had spent four years, before all this, inside the Central Statistical Bureau, producing the clean grey booklets the regime liked to wave at delegations. She knew how a number was born and how it could be quietly re-parented on its way up the chain. She knew, too, every honest reason a district could look guilty.

So she did the careful things.

First she stopped comparing stations to the whole nation and started comparing each station only to its own neighbours, the way the method demanded: standardise every small station against the cluster of stations nearest it, so that a poor mountain village was judged against poor mountain villages and not against Solvat. Real regional difference washed out. What was left, if anything was left, would be the part that geography could not explain.

The pattern that surfaced was not the loud national thumbprint. It was quieter and, to her, far worse. The very small stations, the ones with a few hundred voters and often a single official and no monitor in the room, sat systematically up and to the right of their own neighbours. Not all of them. But far too many, and all leaning the same way, toward more turnout and more Renko than the identical village down the road. It was the signature not of stuffed boxes in the cities but of pressure applied in small rooms where no one was watching. A finger on a shoulder. A list of who had not yet come.

Then she did the thing that frightened her, because good method is often the thing you least want to do.

She ran her model, the finite mixture that sorted every precinct into clean, or nudged, or fabricated, and asked it for its confidence. It gave her an answer. Then, when she perturbed the missing data, it gave her a different answer, equally sure of itself. Then a third. Whole regions of the country had votes that had simply never been published at station level, and into those holes the model poured competing stories, each internally perfect, each incompatible with the others. Coercion. Ballot-stuffing. Or something more surgical, records that had been quietly not released at all.

She sat with the three answers at four in the morning and understood that statistics alone would never choose between them. The numbers could point. They could not testify.

Something could.

---

His name, it turned out, was Toma, and he was seventeen.

He ran what the Concord had taken to calling the archive, from the back of a phone-repair shop where the smell of hot solder never quite left. On election night, all across Kavring, poll watchers and ordinary voters had done one small, stubborn thing before they went home. At each station, when counting finished, the machine printed a paper record of that station's result, and by law it was posted on the wall for anyone to see, signed by the officials present. People had photographed those sheets. The protokols. Tens of thousands of them, timestamped, geotagged, blurred, glorious.

"We've got about eighty-two percent of stations so far," Toma said, not looking up from the three phones he was managing at once. "People are still walking them in. Some of the mountain ones came by bus." He said it the way another boy might report a score.

Mira felt something move in her chest that she did not have a clean name for.

"Toma," she said. "I need you to do something tedious and enormous."

For two days they built the comparison no headline could hold but no honest person could dismiss. On one side, the number a station had printed on its own wall at the close of counting, signed by the regime's own officials. On the other, the number the Central Commission had eventually published for that same station.

Where the two matched, they wrote nothing. Democracies are made of the parts that match.

Where they diverged, they had a fact. Not an inference. Not a shape in a cloud. A photograph of a signed sheet that said one thing and a government ledger that said another. And they diverged in one direction only, the way water never runs uphill by accident.

It was, Mira thought, the least clever thing she had done in years, and the only thing that could not be corrected on television.

---

There was one district she had been avoiding, and she knew why.

Ilenmark province, the town of Torun, high and cold, where the great dam was and where her mother had been born. Torun had returned eighty-six percent for Renko. On any naive test it lit up like a fire. And the precinct chair for Torun, station forty-one through forty-four, was Sanda Voll. Her aunt.

She drove up on the third day because a phone call would have let Sanda hang up.

Her aunt met her at the door of the low stone house with flour on her hands and suspicion in her eyes, and did not ask her in for a while.

"You've come to tell me my neighbours are liars," Sanda said.

"No," Mira said. "I've come because I think they're honest, and I need to prove it."

That, at least, was unexpected enough to open the door.

Over tea that neither of them drank, Mira tried to explain the thing that had been sharpening in her all week. That the danger for the Concord was not only Renko's lies but their own hunger to see fraud everywhere. That a district could vote overwhelmingly for a man for reasons that were not fear, and that if the movement pretended otherwise, it would be no better than the commission.

"Torun loves him," Sanda said flatly. "You want me to be ashamed of that. I'm not. He built the dam. The pensions come. My neighbours are not frightened, Mira, they are grateful, and you people in Solvat have never once been able to tell the difference."

"I know," Mira said. "That's exactly why I need Torun. I need somewhere that voted for him honestly, so the country can see what honest looks like. So that when I point at the places where it wasn't honest, no one can say I just hate the man."

Sanda was quiet for a long time.

"You want to hold my town up," she said slowly, "as the clean one."

"Yes."

"Even though it makes your side look worse. Even though it proves people chose him."

"Because it's true," Mira said. "And I'm tired of only telling the true things that help me."

Her aunt got up, went to a drawer beneath the icons, and took out a folded sheet gone soft with handling. The original protokol from station forty-two. Printed at 9:14 on election night. Signed, at the bottom, by Sanda Voll in her careful hand.

"Eighty-six percent," Sanda said. "Four hundred and eleven votes for him out of four hundred and seventy-eight. I counted them myself. Twice. In front of everyone." She pushed it across the table. "Take your photograph. Prove my neighbours honest. I want it on the record what my town actually did."

Mira photographed the sheet with hands that were not quite steady, and only later, back in Solvat with the commission's ledger open beside the image, did she understand what her aunt had actually given her.

Because the commission had not published four hundred and eleven for station forty-two.

It had published four hundred and sixty-two.

Even Torun, which had loved him freely, which had needed no coercion at all, had been topped up on its way to the capital. Fifty-one votes conjured onto the honest ledger of an honest town. The fraud was not in the small cold rooms of the mountains after all, or not only there. It was in the last mile, in the space between the wall and the ledger, applied even where it was not needed, the way a habit is applied.

The cleanest district in her whole dataset was also, now, her clearest proof. Her aunt's pride and her aunt's evidence were the same document.

---

On the fourth night she found where the graphic had been born, and it settled the last of her doubts about what tomorrow was.

Toma helped her trace it. The gold-and-black digit chart had not risen from the crowd the way it seemed to. It had surfaced almost fully formed across a few dozen accounts within the same eleven minutes, accounts that had spent the previous year sharing state broadcaster clips and now, suddenly, shared the opposition's most exciting and most breakable proof. They had not made it to mock it. They had made it to feed it to the hungry, and then they had stepped back to let the movement carry its own poison to the microphone.

Mira looked at the timestamps for a long time.

Then she called Danel.

"I know where your beautiful graphic came from," she said. "It came from them. They built the thing you want to lead with. They are praying we open with it."

Silence on the line. Then, tightly: "You can't know that."

"I can show you the pattern. Whether you believe it is up to you." She closed her eyes. "Danel. I am not asking you to be quiet tomorrow. I am asking you to be right in a way they can't take back. Bench the digits. Lead with the sheets. Lead with Torun."

"The digits are what people love."

"I know," she said. "That's the whole trap. They gave us the thing we'd love too much to check."

---

The Concord had booked the old printers' hall for the release, because it still had a stage and because printers understood the difference between a proof and a copy.

Mira had never spoken in front of more than a seminar. Her hands shook on the lectern. Behind her, on a screen large enough to be seen from the street doors, she did not put the fingerprint, though it was true, and she did not put the digits, though they were beautiful.

She put a photograph of a signed sheet from a station in the eastern marshes, and beside it the commission's published number for the same station, and the difference between them lit red.

"This is not a statistic," she said, and her voice steadied on the word. "This is a receipt. Signed by the government's own officials. On the wall, they counted this. In the capital, they published that. We have this for tens of thousands of stations, and we will give every one of them to you, so that you can check us. We are not asking you to trust our mathematics."

She advanced the screen. Torun. Her aunt's careful signature. Four hundred and eleven, and beside it four hundred and sixty-two.

"This town voted for the President," Mira said. "Freely, gladly, by a wide margin. I will not stand here and pretend otherwise, because we are not in the business of inventing numbers. That is the other side's work." A sound went through the hall. "And even here, in a place that needed no help to love him, fifty-one votes were added on the way to the capital. If they would forge the ledger of a town that was already his, ask yourself what they did in the towns that were not."

She stepped back. Danel took the lectern, and for once he did not need to make anyone lean forward; they were already leaning.

"We were offered an easier proof this week," he said, and Mira's breath caught, because they had not agreed he would say this. "A clever one. It went everywhere. We are not going to use it. Not because it isn't popular, but because we could not defend it, and we have decided we would rather be right than loud." He let that sit. "You will hear, soon, a very calm man on television explain that some proof the opposition used is worthless. Believe him. He'll be talking about the proof we threw away."

---

Emin Karr went on air the next evening in a very good suit, as Mira had known he would.

She watched from the apartment on Vetch Street with the sound on this time. Karr was reasonable and warm and devastating, and he spent eleven full minutes dismantling the second-digit test, running it on clean elections, showing it convicting the innocent. It was, Mira had to admit, a beautiful demolition.

It landed on nothing. He was swinging at a graphic the Concord had publicly buried the day before. Every blow he struck only confirmed the strange thing Danel had promised the country: that the opposition had been honest enough to discard its own best-looking weapon. Karr never once mentioned a signed protokol. He could not. There was no clever way to run a clean election on a photograph of your own official's handwriting.

Renko did not fall that night. Mira had never believed he would. Regimes do not topple because a plot lights up in the corner; they are not that fragile, and the truth is not that quick. The commission issued a statement calling the archive a foreign fabrication, and then, three days later, quietly declined to release the station-level data that would have disproved it, which was its own kind of confession to anyone still counting.

But something had moved. The monitors' final report, when it came, cited the receipts and not the digits. Two of Renko's provincial governors, the careful kind who could read a shifting wind, began saying interesting things about transparency. The archive spread to servers in nine countries, and became the sort of fact that could no longer be un-known, only denied. A denied fact is a heavier thing to carry than a hidden one.

Mira drove up to Torun again when the first snow came.

Sanda met her at the door and this time let her in at once. On the wall, beside the icons, her aunt had framed something. Not a certificate. A printout. Station forty-two, four hundred and eleven and four hundred and sixty-two, the honest number and the stolen one, side by side.

"So no one forgets what we actually did," Sanda said gruffly, and put the kettle on.

They drank the tea this time.

Later, driving down out of the mountains in the blue winter dark, Mira thought about the shape that had started all of it: the cloud, and the bright thumbprint in the corner. She had never used it in the end. It had been true and it had not been enough, because a shape could be argued with and a signature could not.

The country had not been saved by the cleverest number. It had been saved, a little, by the plainest one, carried up the mountains on buses by people who had counted their own votes and refused to let the counting be changed behind their backs.

That was the whole discovery, if it was one. Not that the truth is powerful. Only that the truth which survives is the truth you can put on a table, and sign, and hand to anyone, and dare them to check.`,
  references: [
    {
      id: 1,
      title: 'Statistical detection of systematic election irregularities',
      url: 'https://www.pnas.org/doi/10.1073/pnas.1210722109',
      description: 'Klimek, Yegorov, Hanel and Thurner (PNAS, 2012) introduce the two-dimensional election "fingerprint" of turnout versus incumbent vote share, and the incremental- and extreme-fraud signatures that produce the second cluster near total turnout and total support. This is the core method Mira computes and, crucially, distrusts as suggestive rather than conclusive.'
    },
    {
      id: 2,
      title: 'Testing for voter rigging in small polling stations',
      url: 'https://www.science.org/doi/10.1126/sciadv.1602363',
      description: 'Jimenez, Hidalgo and Klimek (Science Advances, 2017) standardise each polling station against its geographic neighbours and show that a systematic upper-right displacement among small stations is compatible with coercion and intimidation. This grounds Mira\'s small-station analysis of pressure applied in unmonitored rooms.'
    },
    {
      id: 3,
      title: 'Benford\'s Law and the Detection of Election Fraud',
      url: 'https://doi.org/10.1093/pan/mpr014',
      description: 'Deckert, Myagkov and Ordeshook (Political Analysis, 2011) demonstrate that the second-digit Benford test performs little better than chance at detecting electoral fraud, flagging clean elections and passing rigged ones. This is the evidentiary basis for the story\'s central warning that the viral "the digits confess" graphic is a trap.'
    },
    {
      id: 4,
      title: 'Forensic analysis of the Turkey 2023 presidential election reveals extreme vote swings in remote areas',
      url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0293239',
      description: 'Klimek, Aykac and Thurner (PLOS ONE, 2023) apply election-forensic fingerprints and small-station tests to a recent real election, finding localised anomalies in remote low-oversight units while stressing that statistics indicate correlation and that external evidence is indispensable. This models both Mira\'s methods and her insistence on physical proof.'
    },
    {
      id: 5,
      title: 'Final Report: Observation of the 2024 Presidential Election in Venezuela',
      url: 'https://www.cartercenter.org/publication/final-report-observation-of-the-2024-presidential-election-in-venezuela',
      description: 'The Carter Center (2025) documents how citizen-collected photographs of signed, machine-printed precinct tally sheets covering about 82% of stations provided decisive evidence of the true result after the electoral authority suppressed disaggregated data. This is the real-world precedent behind the story\'s protokol archive.'
    }
  ]
};
