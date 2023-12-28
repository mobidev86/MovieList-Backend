
import { IsString, IsNotEmpty, IsNumber, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions, IsOptional, IsIn } from 'class-validator';
import { IAddMovie, IEditMovie } from './movie.interface';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ACTIVE, DE_ACTIVE } from '../../common/constant';

@ValidatorConstraint({ name: 'isImageExtension', async: false })
export class IsImageExtensionConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        if (typeof value !== 'string')
            return false;

        const allowedExtensions = args.constraints[0];
        const fileExtension = value.split('.').pop()?.toLowerCase()
        return allowedExtensions.includes(fileExtension);
    }
    defaultMessage(args: ValidationArguments) {
        const allowedExtensions = args.constraints[0];
        return `File must have one of the following extensions: ${allowedExtensions.join(', ')}.`;
    }
}
export function IsImageExtension(allowedExtensions: string[], validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [allowedExtensions],
            validator: IsImageExtensionConstraint,
        });
    };
}
export class AddMovieValidation implements IAddMovie {
    @IsString({ message: 'title must be a string' })
    @IsNotEmpty({ message: "Required field missing:'title'" })
    title!: string;
    @IsNotEmpty({ message: "Required field missing:'publish_year'" })
    publish_year!: number;

    @IsNotEmpty({
        message: "'Required field missing: 'poster_image'"
    })
    @IsImageExtension(['png', 'jpg', 'jpeg'], { message: 'Invalid file extension.' })
    poster_image!: string;
}

export class EditMovieValidation implements IEditMovie {
    @IsNotEmpty({
        message: "Required field missing:'movieId'"
    })
    @Transform((value: any) => value ? new Types.ObjectId(value) : null)
    _id!: Types.ObjectId;
    @IsOptional()
    @IsString({ message: 'title must be a string' })
    title!: string;
    @IsOptional()
    publish_year!: number;
    @IsOptional()
    @IsImageExtension(['png', 'jpg', 'jpeg'], { message: 'Invalid file extension.' })
    poster_image!: string;

    @IsOptional()
    @IsIn([ACTIVE, DE_ACTIVE, -1])
    @Transform((value: any) => value ? +value : null)
    active!: number
}