import bot from "./lib/grammy";
import { FormatDate } from "./lib/TextFormatter";


const main = async () => {
  // Handle the /start command.
  bot.command(
    "start",
    async (ctx) =>
      await ctx.reply(
        `Hi!, I am your Fitness Watcher Bot. \n\nCommands:
<b>/help</b> - for instruction on how to add an entry`,
        {
          parse_mode: "HTML",
        }
      )
  );
  bot.command("help", async (ctx) => {
    return await ctx.reply(
      `To submit an entry you can add a hashtag of #Exercise to your message content or caption`,
      {
        parse_mode: "HTML",
      }
    );
  });
  const pattern: RegExp = /#Exercise/;

  // check if the message contains at least one attachment of video or picture
  bot.hears(pattern, async (ctx) => {
    if (
      (ctx.message?.photo != null && ctx.message?.photo?.length > 0) ||
      ctx.message?.video != null
    ) {
      return await ctx.reply(
        `Your exercise entry has been submitted\n<b>Submitted Date:</b> ${FormatDate(
          new Date(ctx.message?.date * 1000)
        )}`,
        {
          parse_mode: "HTML",
        }
      );
    }
    return await ctx.reply(
      "Please submit at least one attachment of video or picture."
    );
  });

  await bot.start();
};

void main();
