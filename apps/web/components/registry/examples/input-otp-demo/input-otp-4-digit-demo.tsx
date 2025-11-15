import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/registry/ui/input-otp"

export default function InputOTP4DigitDemo() {
    return (
        <div className="flex flex-col items-center gap-6">
            <InputOTP maxLength={4}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}

