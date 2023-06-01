import bot from "./lib/grammy";
import supabase from "./lib/supabase";
import { FormatDate } from "./lib/TextFormatter";
import * as dotenv from "dotenv";
import { isEmpty } from "lodash";
dotenv.config();

const main = async () => {
  // #region #==== Start Command ====#
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
  // #endregion #======================#

  // #region #==== Help Command ====#
  bot.command("help", async (ctx) => {
    const { data, error } = await supabase.from("Entries").select();
    if (!isEmpty(error)) {
      return await ctx.reply(
        `Error: ${error.message}\n\nPlease contact the developer for assistance`,
        {
          parse_mode: "HTML",
        }
      );
    }
    console.log(data);
    return await ctx.reply(
      `To submit an entry you can add a hashtag of #Exercise to your message content or caption`,
      {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message?.message_id,
      }
    );
  });
  // #endregion #======================#

  // #region #==== Exercise Command ====#
  const pattern: RegExp = /#Exercise/;
  // check if the message contains at least one attachment of video or picture
  bot.hears(pattern, async (ctx) => {
    if (
      (ctx.message?.photo != null && ctx.message?.photo?.length > 0) ||
      ctx.message?.video != null
    ) {
      const { data, error } = await supabase.from("Entries").insert({
        messageId: ctx.message?.message_id,
        chatId: ctx.message?.chat?.id,
        user: ctx.message?.from?.username,
      });
      if (!isEmpty(error)) {
        return await ctx.reply(
          `Error: ${error.message}\n\nPlease contact the developer for assistance`,
          {
            parse_mode: "HTML",
          }
        );
      }
      console.log(data);
      return await ctx.reply(
        `Your exercise entry has been submitted\n<b>Submitted Date:</b> ${FormatDate(
          new Date(ctx.message?.date * 1000)
        )}`,
        {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message?.message_id,
        }
      );
    }
    return await ctx.reply(
      "Please submit at least one attachment of video or picture."
    );
  });
  // #endregion #======================#
  await bot.start();
};

void main();
