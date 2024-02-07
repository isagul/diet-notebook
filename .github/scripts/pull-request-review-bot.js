const { execSync } = require('child_process');
const { context, getOctokit } = require('@actions/github');

async function getPRDescription() {
	const octokit = getOctokit(process.env.GITHUB_TOKEN);
	const { data: pullRequest } = await octokit.rest.pulls.get({
		owner: context.repo.owner,
		repo: context.repo.repo,
		pull_number: context.payload.pull_request.number,
	});
	return pullRequest.body;
}

async function generateReview(prDescription) {
	const openaiApiKey = process.env.OPENAI_API_KEY;
	const prompt = `Review the following pull request:\n${prDescription}\n\nReview:`;

	const review = execSync(
		`openai api completions.create --model=text-davinci-002 --prompt "${prompt}" --max_tokens=150 --key ${openaiApiKey}`,
		{ encoding: 'utf-8' },
	).choices[0].text.trim();

	return review;
}

async function main() {
	const prDescription = await getPRDescription();
	const review = await generateReview(prDescription);

	const octokit = getOctokit(process.env.GITHUB_TOKEN);
	await octokit.pulls.createReview({
		owner: context.repo.owner,
		repo: context.repo.repo,
		pull_number: context.payload.pull_request.number,
		body: review,
		event: 'COMMENT',
	});
}

main();
