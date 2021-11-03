import { Snowflake } from "discord-api-types";
import { CommandInteraction } from "discord.js";
import { Discord, Guild, Slash, SlashOption } from "discordx";

@Discord()
@Guild("768975702187704360")
export abstract class Send {
    @Slash("send", { description: "Send a message to a user" })
    async send(
        @SlashOption("user", { description: "The user user the message is going to be send to.", required: true, type: "USER" })
        targetId: Snowflake,

        @SlashOption("message", { description: "The message you want to send.", required: true, type: "STRING" })
        message: string,

        interaction: CommandInteraction
    ) {
        const user = await interaction.guild.members.fetch(targetId);
        if (!user) return interaction.reply({ content: "This is user is not on this server.", ephemeral: true })

        try {
            user.send(message)
            interaction.reply("The message has been send. ✅")
            setTimeout(() => interaction.deleteReply(), 5000)
        } catch (error) {
            interaction.reply(`There was an error while sending the message:\n ${error}`)
            setTimeout(() => interaction.deleteReply(), 5000)
        }
    }
}