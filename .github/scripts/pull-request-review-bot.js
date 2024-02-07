const { context, getOctokit } = require('@actions/github');

async function getPRDescription() {
	const octokit = getOctokit(process.env.GITHUB_TOKEN);
	const { data: pullRequest } = await octokit.rest.pulls.get({
		owner: context.repo.owner,
		repo: context.repo.repo,
		pull_number: context.payload.pull_request.number,
	});
	console.log('pullRequest :>> ', pullRequest);
	return pullRequest.body;
}

async function generateReview(prDescription) {
	const openaiApiKey = process.env.OPENAI_API_KEY;
	const prompt = `Review the following pull request:\n${prDescription}\n\nReview:`;

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${openaiApiKey}`,
		},
		method: 'POST',
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'system', content: prompt }],
			max_tokens: 512,
			top_p: 1,
			temperature: 0.5,
			frequency_penalty: 0,
			presence_penalty: 0,
		}),
	});

	return response.json();

	// return response.data.choices[0].text.trim();
}

async function main() {
	const prDescription = await getPRDescription();
	const review = await generateReview(prDescription);

	const octokit = getOctokit(process.env.GITHUB_TOKEN);
	await octokit.rest.pulls.createReview({
		owner: context.repo.owner,
		repo: context.repo.repo,
		pull_number: context.payload.pull_request.number,
		body: review,
		event: 'COMMENT',
	});
}

main();
