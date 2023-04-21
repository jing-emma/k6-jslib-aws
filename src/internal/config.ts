import { HTTPScheme } from './http'

/** Class holding an AWS connection information */
export class AWSConfig {
    /**
     * The AWS region to connect to, as listed: https://docs.aws.amazon.com/general/latest/gr/rande.html
     *
     * @type {string}
     */
    region: string

    /**
     * Your user's AWS access key id credential.
     *
     * @type {string}
     */
    accessKeyId: string

    /**
     * Your user's AWS secret access key credential.
     *
     * @type {string}
     */
    secretAccessKey: string

    /**
     * Your user's AWS session token credential.
     *
     * @type {string}
     */
    sessionToken?: string

    /**
     * The HTTP scheme to use when connecting to AWS.
     *
     * @type {HTTPScheme} ['https']
     */
    scheme: HTTPScheme = 'https'

    // FIXME: Should really be called "host" instead. When used
    // with localstack we pass a complete host (hostname:port) here.
    /**
     * The AWS hostname to connect to.
     *
     * @type {string} ['amazonaws.com']
     */
    endpoint: string = 'amazonaws.com'

    /**
     * Create an AWSConfig.
     *
     * @param {AWSConfigOptions} options - configuration attributes to use when interacting with AWS' APIs
     * @throws {InvalidArgumentException}
     */
    constructor(options: AWSConfigOptions) {
        if (!options.region || options.region === '') {
            throw new InvalidAWSConfigError(
                `invalid AWS region; reason: expected a valid AWS region name (e.g. "us-east-1"), got \`${options.region}\``
            )
        }

        if (!options.accessKeyId || options.accessKeyId === '') {
            throw new InvalidAWSConfigError(
                `invalid AWS access key ID; reason: expected a non empty string, got \`${options.accessKeyId}\``
            )
        }

        if (options.accessKeyId.length < 16 || options.accessKeyId.length > 128) {
            throw new InvalidAWSConfigError(
                `invalid AWS access key ID; reason: size should be between 16 and 128 characters, got ${options.accessKeyId.length}`
            )
        }

        if (!options.secretAccessKey || options.secretAccessKey === '') {
            throw new InvalidAWSConfigError(
                `invalid AWS secret access key; reason: expected a non empty string, got \`${options.secretAccessKey}\``
            )
        }

        if (options.secretAccessKey.length < 16 || options.secretAccessKey.length > 128) {
            throw new InvalidAWSConfigError(
                `invalid AWS secret access key; reason: size should be between 16 and 128 characters, got ${options.secretAccessKey.length}`
            )
        }

        this.region = options.region
        this.accessKeyId = options.accessKeyId
        this.secretAccessKey = options.secretAccessKey

        if (options.sessionToken !== undefined) {
            this.sessionToken = options.sessionToken
        }

        if (options.scheme !== undefined) {
            this.scheme = options.scheme
        }

        if (options.endpoint !== undefined) {
            this.endpoint = options.endpoint
        }
    }
}

/**
 * Interface representing AWSConfig options
 */
export interface AWSConfigOptions extends AWSConnectionOptions {
    /**
     * The AWS region to connect to, as listed: https://docs.aws.amazon.com/general/latest/gr/rande.html
     *
     * @type {string}
     */
    region: string

    /**
     * Your user's AWS access key id credential.
     *
     * @type {string}
     */
    accessKeyId: string

    /**
     * Your user's AWS secret access key credential.
     *
     * @type {string}
     */
    secretAccessKey: string

    /**
     * Your user's AWS session token credential.
     *
     * @type {string}
     */
    sessionToken?: string
}

/**
 * Interface representing AWS connection options
 */
export interface AWSConnectionOptions {
    /**
     * The HTTP scheme to use when connecting to AWS.
     *
     * @type {HTTPScheme}
     */
    scheme?: HTTPScheme

    /**
     * The AWS hostname to connect to.
     *
     * @type {string}
     */
    endpoint?: string
}

/** Class representing an invalid AWS configuration */
export class InvalidAWSConfigError extends Error {
    constructor(message: string) {
        super(message)
    }
}
