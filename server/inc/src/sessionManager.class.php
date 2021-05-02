<?php declare(strict_types = 1);

namespace App;

use ReflectionFunctionAbstract;

/**
 * Secure session with key pair
 */
class session
{
    /** @var int Id for current session if any specified */
    protected $sessionId;

    /** @var string Current session key */
    protected $sessionKey;

    /** @var mixed All session data that needs to be stored */
    protected $sessionData = null;

    public function __construct()
    {
        session_start();

        $this->sessionData = &$_SESSION['browsing_session'] ?? null;
    }

    /**
     * Predicate tells if the session is active unlocked
     * 
     * @return bool
     */
    public function is_active(): bool
    {
        return $this->sessionData['key'] !== null;
    }

    /**
     * Prepare session key and data
     */
    private function create_session(): void
    {
        /** @var string generated session key */
        $generatedKey = bin2hex(random_bytes(16));

        $this->sessionData = [
            'key' => $generatedKey
        ];
    }

    /**
     * Unlock session 
     */
    public function session_begin(string $accessKey): string
    {
        if($accessKey !== ACCESS_KEY){
            return '';
        }

        $this->create_session();

        return $this->sessionData['key'];
    }

    public function session_unlock($key): bool
    {
        return $this->sessionData['key'] === $key;
    }

    public function session_destroy(): void
    {
        unset($_SESSION['browsing_session']);
        session_destroy();
    }

    /**
     * Set session item data
     */
    public function set_property(string $tag, mixed $value): void
    {
        $this->sessionData[$tag] = $value;
    }

    /**
     * Get session item data
     */
    public function get_property(string $tag): string
    {
        return $this->sessionData[$tag] ?? '';
    }
}