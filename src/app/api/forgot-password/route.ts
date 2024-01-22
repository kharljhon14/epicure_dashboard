import User from '@/models/user';
import {
  type ForgotPasswordRequestScehmaType,
  ForgotPasswordRequestSchema,
} from '@/schemas/user';
import connectDB from '@/utils/connectDB';
import { NEXT_BASE_URL } from '@/utils/enviromentVariables';
import { sendForgotPasswordTokenEmail } from '@/utils/mail';
import { schemaValidator } from '@/utils/schemaValidator';
import { createForgotPasswordToken } from '@/utils/token';

export async function POST(req: Request) {
  await connectDB();

  const body: ForgotPasswordRequestScehmaType = await req.json();

  const error = schemaValidator(ForgotPasswordRequestSchema, body);

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  const user = await User.findOne({ email: body.email });

  if (!user)
    return Response.json({ error: 'Could not find user!' }, { status: 404 });

  const forgotPasswordToken = createForgotPasswordToken({
    id: user._id.toString(),
    name: user.name,
  });

  const url = `${NEXT_BASE_URL}/reset-password/${forgotPasswordToken}`;

  sendForgotPasswordTokenEmail(
    {
      name: user.name,
      email: user.email,
    },
    url
  );

  return Response.json({ status: 'Success' });
}
