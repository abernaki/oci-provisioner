export default {
  async scheduled(event, env, ctx) {
    await triggerWorkflow(env);
  },
  async fetch(request, env, ctx) {
    await triggerWorkflow(env);
    return new Response("Triggered", { status: 200 });
  }
};

async function triggerWorkflow(env) {
  const response = await fetch(
    "https://api.github.com/repos/abernaki/oci-provisioner/actions/workflows/oci-retry.yml/dispatches",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "cloudflare-worker"
      },
      body: JSON.stringify({ ref: "main" })
    }
  );
  console.log("Status:", response.status);
}
