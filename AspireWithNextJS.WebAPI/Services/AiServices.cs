using AutoMapper;
using Microsoft.DotNet.Interactive;
using Microsoft.DotNet.Interactive.AIUtilities;
using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AspireWithNextJS.WebAPI.Services
{    
    public class AiServices
    {

        public async Task<string> Summarize(dynamic tableData, string prompt)
        {
            string jsonString = JsonConvert.SerializeObject(tableData);

            var key = Environment.GetEnvironmentVariable("OpenAIKey");;
            var proxyUrl = Environment.GetEnvironmentVariable("OpenAIProxyUrl");
            var openAIDeploymentName = Environment.GetEnvironmentVariable("OpenAIDeploymentName");

            Uri proxyUri = new(proxyUrl);

            AzureKeyCredential token = new(key);

            OpenAIClient client = new OpenAIClient(proxyUri, token);

            var options = new ChatCompletionsOptions
            {
                Messages =
                {
                    new ChatMessage(ChatRole.System, "You are a helpful assistant that assists in analyzing and reviewing data to provide input and help answer questions."),
                    new ChatMessage(ChatRole.User, $""""""
                        Use the below provided data retrieved from a database to assist the user in answering questions given to you. Also provide an overall summary of the data. 
                        If the question does not make sense or the answer cannot be found, write "I don't know."
                        Data from Database in JSON format:
                        """
                        {jsonString}
                        """
                        Initial Prompt: Provide a summary of the given data. Share with me the overall topic of what the information focuses. 
                        Share also the key-value pairs that exist in the data and answer any additional questions provided in the prompt below. 
                        Prompt from user: {prompt}
                        """"""
                        ),
                }, 
                Temperature = 0f,
                DeploymentName = openAIDeploymentName,
            };

            var response = await client.GetChatCompletionsAsync(options);

            return response.Value.Choices[0].Message.Content;
        }

    }
}
