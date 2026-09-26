import { ImageResponse } from 'next/og';
import { profile } from '@/data/portfolio';

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 628 };
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '72px 80px',
                    background: '#151719',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Top accent bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#b9e780',
                    }}
                />

                {/* Grid pattern overlay (subtle) */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(242,243,238,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(242,243,238,0.045) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div
                        style={{
                            fontSize: 16,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#b9e780',
                            marginBottom: 24,
                        }}
                    >
                        {profile.site.replace('https://', '')}
                    </div>

                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 600,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.0,
                            color: '#f2f3ee',
                            marginBottom: 20,
                        }}
                    >
                        {profile.name}
                    </div>

                    <div
                        style={{
                            fontSize: 28,
                            color: '#adb3b1',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {profile.role} · {profile.location}
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
